"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientGooglePubSub = void 0;
const pubsub_1 = require("@google-cloud/pubsub");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const constants_1 = require("../constants");
const node_events_1 = require("node:events");
/**
 * Proxy for the Google PubSub client
 */
let ClientGooglePubSub = class ClientGooglePubSub extends microservices_1.ClientProxy {
    constructor(options) {
        var _a;
        super();
        /**
         * Parses the response from a `.exists()` call on either a Topic or Subscription
         */
        this.parseExistsResponse = (0, operators_1.map)((existsResponse) => existsResponse[0]);
        this.googlePubSubClient = (_a = options === null || options === void 0 ? void 0 : options.pubSubClient) !== null && _a !== void 0 ? _a : new pubsub_1.PubSub(options === null || options === void 0 ? void 0 : options.pubSubClientConfig);
    }
    /**
     * Since the client on starts listening for messages when event subscribers are added, this
     * method does nothing
     * @returns
     */
    connect() {
        return Promise.resolve();
    }
    /**
     * Terminates the underlying gRPC channel for the PubSub client
     */
    close() {
        return (0, rxjs_1.from)(this.googlePubSubClient.close());
    }
    /**
     * Publishes data and attributes to the supplied Topic
     */
    publishToTopic(topic, publishData, attributes) {
        const request = {
            message: publishData,
            attributes: attributes,
        };
        return this.emit(topic, request);
    }
    /**
     * Get a Subscription instance from the PubSub client. If a Subscription instance is supplied
     * then the returned Subscription will point to the same instance.
     * @param _subscription
     * @returns
     */
    getSubscription(_subscription) {
        if (this.isSubscriptionInstance(_subscription)) {
            return _subscription;
        }
        else {
            return this.googlePubSubClient.subscription(_subscription);
        }
    }
    /**
     * Returns a boolean indicating if the requested Subscription exists
     * @param subscription
     * @returns
     */
    subscriptionExists(subscription) {
        return (0, rxjs_1.from)(this.getSubscription(subscription).exists()).pipe(this.parseExistsResponse);
    }
    /**
     * Attempts to create a Subscription instance belonging to the provided Topic
     * @param _subscription
     * @param _topic
     * @returns
     */
    createSubscription(_subscription, _topic, createSubscriptionOptions) {
        var _a;
        const subscription = this.getSubscription(_subscription);
        if (subscription.topic == null && _topic == null)
            return (0, rxjs_1.of)(null);
        const topic = this.getTopic((_a = subscription.topic) !== null && _a !== void 0 ? _a : _topic);
        return (0, rxjs_1.from)(topic.createSubscription(subscription.name, createSubscriptionOptions)).pipe((0, operators_1.map)((subscriptionResponse) => subscriptionResponse[0]), (0, operators_1.mergeMap)((resp) => {
            if (resp === undefined) {
                return (0, rxjs_1.throwError)('Empty response when creating subscription: ' + subscription.name);
            }
            return (0, rxjs_1.of)(resp);
        }));
    }
    /** Attempts to delete a Subscription instance */
    deleteSubscription(subscription) {
        return (0, rxjs_1.from)(this.getSubscription(subscription).delete()).pipe((0, operators_1.mapTo)(void 0));
    }
    /**
     * Register a listener for from `message` events on the PubSub client for the
     * supplied subscription
     * @param subscription
     * @returns
     */
    listenForMessages(subscription) {
        return (0, rxjs_1.fromEvent)(this.getSubscription(subscription), constants_1.GOOGLE_PUBSUB_SUBSCRIPTION_MESSAGE_EVENT);
    }
    async *getMessageIterator(subscription) {
        const subObj = this.getSubscription(subscription);
        for await (const message of (0, node_events_1.on)(subObj, constants_1.GOOGLE_PUBSUB_SUBSCRIPTION_MESSAGE_EVENT)) {
            yield message;
        }
    }
    /**
     * Get a Topic instance from the PubSub client. If a Topic instance is supplied
     * then the returned Topic will point to the same instance.
     * @param _topic
     * @returns
     */
    getTopic(_topic) {
        if (this.isTopicInstance(_topic)) {
            return _topic;
        }
        else {
            return this.googlePubSubClient.topic(_topic);
        }
    }
    /**
     * Returns a boolean indicating if the requested Topic exists
     * @param subscription
     * @returns
     */
    topicExists(topic) {
        return (0, rxjs_1.from)(this.getTopic(topic).exists()).pipe(this.parseExistsResponse);
    }
    /**
     * Attempts to create a new Topic instance
     * @param _subscription
     * @param _topic
     * @returns
     */
    createTopic(topic) {
        return (0, rxjs_1.from)(this.getTopic(topic).create()).pipe((0, operators_1.map)((topicResponse) => topicResponse[0]));
    }
    /**
     * Attempts to delete a Topic instance
     * @param topic
     * @returns
     */
    deleteTopic(topic) {
        return (0, rxjs_1.from)(this.getTopic(topic).delete()).pipe((0, operators_1.mapTo)(void 0));
    }
    /**
     * Returns client health information
     * @returns
     */
    getHealth() {
        return {
            isOpen: this.googlePubSubClient.isOpen,
            isEmulator: this.googlePubSubClient.isEmulator,
            projectId: this.googlePubSubClient.projectId,
        };
    }
    /**
     * Dispatch an outgoing message event
     * @param packet
     * @returns
     */
    dispatchEvent(packet) {
        const topic = this.googlePubSubClient.topic(packet.pattern);
        if (Buffer.isBuffer(packet.data.message)) {
            return topic.publish(packet.data.message, packet.data.attributes);
        }
        return topic.publishJSON(packet.data.message, packet.data.attributes);
    }
    /**
     * Indicates if the provided value is a Topic instance
     * @param topic
     */
    isTopicInstance(topic) {
        return topic instanceof pubsub_1.Topic;
    }
    /**
     * Indicates if the provided value is a Subscription instance
     * @param subscription
     */
    isSubscriptionInstance(subscription) {
        return subscription instanceof pubsub_1.Subscription;
    }
    /**
     * This refers to an internal publish method to NestJS, please use `publishToTopic`.
     */
    publish() {
        throw new Error('Method intentionally not implemented.');
    }
};
ClientGooglePubSub = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], ClientGooglePubSub);
exports.ClientGooglePubSub = ClientGooglePubSub;
//# sourceMappingURL=client-google-pubsub.js.map