import { Logger } from '@nestjs/common';
import { CustomTransportStrategy, MessageHandler, Server } from '@nestjs/microservices';
import { GooglePubSubMessageDeserializer } from '../deserializers';
import { GooglePubSubTransportOptions } from '../interfaces';
export declare class GooglePubSubTransport extends Server implements CustomTransportStrategy {
    /**
     * Logger
     */
    protected readonly logger: Logger;
    /**
     * Convert the incoming message into a ReadPacket
     */
    protected readonly deserializer: GooglePubSubMessageDeserializer;
    /**
     * Google PubSub client handle
     */
    private readonly googlePubSubClient;
    /**
     * This function will be used to determine subscription names when only a topic name is given
     */
    private readonly subscriptionNamingStrategy;
    /**
     * Modifies topic names dynamically
     */
    private readonly topicNamingStrategy;
    /**
     * This function is called after an incoming message is handled and allows control over when/how
     * a message is either acked or nacked
     */
    private readonly ackStrategy;
    /**
     * This function is called after an incoming message encounters an and allows control over
     * when/how a message is either acked or nacked
     */
    private readonly nackStrategy;
    /**
     * Whether to create subscriptions that do not already exist
     */
    private readonly createSubscriptions;
    /**
     * Whether to automatically ack handled messages
     */
    private readonly autoAck;
    /**
     * Whether to automatically nack rejected messages
     */
    private readonly autoNack;
    /**
     * Subscription for all message listeners
     */
    private listenerSubscription;
    /**
     * GooglePubSubSubscriptions keyed by pattern
     */
    private readonly subscriptions;
    constructor(options?: GooglePubSubTransportOptions);
    listen(callback: () => void): void;
    /**
     * Bind message handlers to subscription instances
     * @param callback - The callback to be invoked when all handlers have been bound
     */
    private bindHandlers;
    /**
     * Resolve subscriptions and create them if `createSubscription` is true
     * @param pattern - The pattern from the \@GooglePubSubMessageHandler decorator
     */
    private getSubscriptionFromPattern;
    /**
     * Parse a metadata pattern, throwing an exception if it cannot be parsed.
     *
     * @throws InvalidPatternMetadataException
     * Thrown if the JSON pattern cannot be parsed.
     */
    private parsePattern;
    /**
     * Get the name for the subscription based on the given metadata.
     *
     * @throws InvalidPatternMetadataException
     * This exception is thrown if a subscription name cannot be generated.
     */
    private getSubscriptionName;
    /**
     * Create the dependency object for producing a subscription name.
     *
     * @throws InvalidPatternMetadataException
     * Thrown if `topicName` and `subscriptionName` are both `undefined`.
     */
    private static createSubscriptionNameDependencies;
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
    private getOrCreateSubscription;
    /**
     * Subscribe to a Subscription and include pattern with each message
     */
    private subscribeMessageEvent;
    /**
     * Convert each message into a ReadPacket and include pattern and Context
     */
    private deserializeAndAddContext;
    /**
     * Pass ReadPacket to internal `handleEvent` method
     */
    private handleMessage;
    /**
     * This is called on transport close by the NestJS internals
     */
    close(): Promise<void>;
    getHandlerByPattern(pattern: string): MessageHandler | null;
}
//# sourceMappingURL=server-google-pubsub.d.ts.map