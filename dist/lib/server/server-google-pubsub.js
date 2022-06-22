"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GooglePubSubTransport = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const client_1 = require("../client");
const google_pubsub_context_1 = require("../ctx-host/google-pubsub.context");
const deserializers_1 = require("../deserializers");
const errors_1 = require("../errors");
const transport_error_exception_1 = require("../errors/transport-error.exception");
const interfaces_1 = require("../interfaces");
const basic_ack_strategy_1 = require("../strategies/basic-ack.strategy");
const basic_nack_strategy_1 = require("../strategies/basic-nack.strategy");
const basic_subscription_naming_strategy_1 = require("../strategies/basic-subscription-naming-strategy");
const basic_topic_naming_strategy_1 = require("../strategies/basic-topic-naming-strategy");
class GooglePubSubTransport extends microservices_1.Server {
    constructor(options) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        super();
        /**
         * Logger
         */
        this.logger = new common_1.Logger('GooglePubSubTransport');
        /**
         * Subscription for all message listeners
         */
        this.listenerSubscription = null;
        /**
         * GooglePubSubSubscriptions keyed by pattern
         */
        this.subscriptions = new Map();
        /**
         * Parse a metadata pattern, throwing an exception if it cannot be parsed.
         *
         * @throws InvalidPatternMetadataException
         * Thrown if the JSON pattern cannot be parsed.
         */
        this.parsePattern = (pattern) => {
            try {
                return JSON.parse(pattern);
            }
            catch (error) {
                throw new errors_1.InvalidPatternMetadataException(pattern);
            }
        };
        /**
         * Get the name for the subscription based on the given metadata.
         *
         * @throws InvalidPatternMetadataException
         * This exception is thrown if a subscription name cannot be generated.
         */
        this.getSubscriptionName = (metadata, pattern) => {
            const subscriptionNameDeps = GooglePubSubTransport.createSubscriptionNameDependencies(metadata, pattern);
            return this.subscriptionNamingStrategy.generateSubscriptionName(subscriptionNameDeps);
        };
        /**
         * Get the subscription from the pattern metadata.
         *
         * @remarks
         * If PubSub Client cannot create the subscription, or if the application is not configured to
         * create subscriptions, this method will return null when the subscription does not already
         * exist.
         *
         * @throws InvalidPatternMetadataException
         * Thrown if attempting to create a subscription, but a topic name is not provided.
         */
        this.getOrCreateSubscription = async (subscriptionName, topicName, createOptions, pattern) => {
            const subscriptionExists = (await this.googlePubSubClient
                .subscriptionExists(subscriptionName)
                .toPromise());
            if (subscriptionExists)
                return this.googlePubSubClient.getSubscription(subscriptionName);
            if (!this.createSubscriptions)
                return null;
            if (!topicName) {
                throw new errors_1.InvalidPatternMetadataException(pattern);
            }
            const _topicName = this.topicNamingStrategy.generateTopicName(topicName);
            const topic = this.googlePubSubClient.getTopic(_topicName);
            return (await this.googlePubSubClient
                .createSubscription(subscriptionName, topic, createOptions)
                .toPromise());
        };
        /**
         * Subscribe to a Subscription and include pattern with each message
         */
        this.subscribeMessageEvent = ([pattern, subscription]) => {
            return this.googlePubSubClient.listenForMessages(subscription).pipe((0, operators_1.map)((message) => [
                pattern,
                message,
            ]));
        };
        /**
         * Convert each message into a ReadPacket and include pattern and Context
         */
        this.deserializeAndAddContext = ([pattern, message]) => {
            return [
                pattern,
                this.deserializer.deserialize(message, { metadata: pattern }),
                new google_pubsub_context_1.GooglePubSubContext([message, pattern, this.autoAck, this.autoNack]),
            ];
        };
        /**
         * Pass ReadPacket to internal `handleEvent` method
         */
        this.handleMessage = ([pattern, packet, ctx]) => {
            return (0, rxjs_1.of)(this.getHandlerByPattern(pattern)).pipe((0, operators_1.mergeMap)((handler) => {
                if (handler == null) {
                    throw new transport_error_exception_1.TransportError('Handler should never be nullish.', pattern, Array.from(this.handlers.keys()));
                }
                return (0, rxjs_1.from)(handler(packet, ctx)).pipe((0, operators_1.mergeMap)((i) => this.transformToObservable(i)), (0, operators_1.mapTo)(null));
            }), (0, operators_1.catchError)((err) => {
                return (0, rxjs_1.of)(err);
            }), (0, operators_1.map)((err) => {
                const ack = packet.data.ack.bind(packet.data);
                const nack = packet.data.nack.bind(packet.data);
                if (err) {
                    this.nackStrategy.nack(err, ack, nack, ctx);
                }
                else {
                    this.ackStrategy.ack(ack, nack, ctx);
                }
            }));
        };
        this.googlePubSubClient = (_a = options === null || options === void 0 ? void 0 : options.client) !== null && _a !== void 0 ? _a : new client_1.ClientGooglePubSub();
        this.createSubscriptions = (_b = options === null || options === void 0 ? void 0 : options.createSubscriptions) !== null && _b !== void 0 ? _b : false;
        this.autoAck = (_c = options === null || options === void 0 ? void 0 : options.autoAck) !== null && _c !== void 0 ? _c : true;
        this.autoNack = (_d = options === null || options === void 0 ? void 0 : options.autoNack) !== null && _d !== void 0 ? _d : false;
        this.subscriptionNamingStrategy =
            (_e = options === null || options === void 0 ? void 0 : options.subscriptionNamingStrategy) !== null && _e !== void 0 ? _e : new basic_subscription_naming_strategy_1.BasicSubscriptionNamingStrategy();
        this.topicNamingStrategy = (_f = options === null || options === void 0 ? void 0 : options.topicNamingStrategy) !== null && _f !== void 0 ? _f : new basic_topic_naming_strategy_1.BasicTopicNamingStrategy();
        this.ackStrategy = (_g = options === null || options === void 0 ? void 0 : options.ackStrategy) !== null && _g !== void 0 ? _g : new basic_ack_strategy_1.BasicAckStrategy();
        this.nackStrategy = (_h = options === null || options === void 0 ? void 0 : options.nackStrategy) !== null && _h !== void 0 ? _h : new basic_nack_strategy_1.BasicNackStrategy();
        this.deserializer = new deserializers_1.GooglePubSubMessageDeserializer();
        this.handlers = new Map([...this.messageHandlers].filter((h) => h[1].isEventHandler));
    }
    listen(callback) {
        this.bindHandlers(callback);
    }
    /**
     * Bind message handlers to subscription instances
     * @param callback - The callback to be invoked when all handlers have been bound
     */
    async bindHandlers(callback) {
        // Set up our subscriptions from any decorated topics
        await (0, rxjs_1.from)(this.handlers)
            .pipe((0, operators_1.mergeMap)(([pattern]) => this.getSubscriptionFromPattern(pattern)))
            .toPromise();
        // Group all of our event listeners into an array
        const listeners = Array.from(this.subscriptions, this.subscribeMessageEvent);
        // Pass every emitted event through the same pipeline
        this.listenerSubscription = (0, rxjs_1.merge)(...listeners)
            .pipe((0, operators_1.map)(this.deserializeAndAddContext), (0, operators_1.mergeMap)(this.handleMessage))
            .subscribe();
        callback();
    }
    /**
     * Resolve subscriptions and create them if `createSubscription` is true
     * @param pattern - The pattern from the \@GooglePubSubMessageHandler decorator
     */
    async getSubscriptionFromPattern(pattern) {
        const metadata = this.parsePattern(pattern);
        const subscriptionName = this.getSubscriptionName(metadata, pattern);
        const subscription = await this.getOrCreateSubscription(subscriptionName, metadata.topicName, metadata.createOptions, pattern);
        if (subscription) {
            this.logger.log(`Mapped {${subscription.name}} handler`);
            this.subscriptions.set(pattern, subscription);
        }
    }
    /**
     * Create the dependency object for producing a subscription name.
     *
     * @throws InvalidPatternMetadataException
     * Thrown if `topicName` and `subscriptionName` are both `undefined`.
     */
    static createSubscriptionNameDependencies(metadata, pattern) {
        const topicName = metadata.topicName;
        const subscriptionName = metadata.subscriptionName;
        if (topicName && subscriptionName) {
            return {
                _tag: interfaces_1.NamingDependencyTag.TOPIC_AND_SUBSCRIPTION_NAMES,
                topicName,
                subscriptionName,
            };
        }
        if (topicName) {
            return {
                _tag: interfaces_1.NamingDependencyTag.TOPIC_NAME_ONLY,
                topicName,
            };
        }
        if (subscriptionName) {
            return {
                _tag: interfaces_1.NamingDependencyTag.SUBSCRIPTION_NAME_ONLY,
                subscriptionName,
            };
        }
        throw new errors_1.InvalidPatternMetadataException(pattern);
    }
    /**
     * This is called on transport close by the NestJS internals
     */
    async close() {
        this.listenerSubscription && this.listenerSubscription.unsubscribe();
        await this.googlePubSubClient.close();
    }
    getHandlerByPattern(pattern) {
        var _a;
        return (_a = this.handlers.get(pattern)) !== null && _a !== void 0 ? _a : null;
    }
}
exports.GooglePubSubTransport = GooglePubSubTransport;
//# sourceMappingURL=server-google-pubsub.js.map