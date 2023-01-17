import { CreateSubscriptionOptions, Subscription } from '@google-cloud/pubsub';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ClientGooglePubSubOutgoingRequestSerializedData, ClientHealthInfo, GooglePubSubMessage, GooglePubSubMessageAttributes, GooglePubSubOptions, GooglePubSubSubscription, GooglePubSubTopic, PublishData } from '../interfaces';
/**
 * Proxy for the Google PubSub client
 */
export declare class ClientGooglePubSub extends ClientProxy {
    private googlePubSubClient;
    constructor(options?: GooglePubSubOptions);
    /**
     * Since the client on starts listening for messages when event subscribers are added, this
     * method does nothing
     * @returns
     */
    connect(): Promise<void>;
    /**
     * Terminates the underlying gRPC channel for the PubSub client
     */
    close(): Observable<void>;
    /**
     * Publishes data and attributes to the supplied Topic
     */
    publishToTopic(topic: string, publishData: PublishData, attributes?: GooglePubSubMessageAttributes): Observable<string>;
    /**
     * Get a Subscription instance from the PubSub client. If a Subscription instance is supplied
     * then the returned Subscription will point to the same instance.
     * @param _subscription
     * @returns
     */
    getSubscription(_subscription: string | GooglePubSubSubscription): GooglePubSubSubscription;
    /**
     * Returns a boolean indicating if the requested Subscription exists
     * @param subscription
     * @returns
     */
    subscriptionExists(subscription: string | GooglePubSubSubscription): Observable<boolean>;
    /**
     * Attempts to create a Subscription instance belonging to the provided Topic
     * @param _subscription
     * @param _topic
     * @returns
     */
    createSubscription(_subscription: string | GooglePubSubSubscription, _topic?: string | GooglePubSubTopic, createSubscriptionOptions?: CreateSubscriptionOptions): Observable<GooglePubSubSubscription | null>;
    /** Attempts to delete a Subscription instance */
    deleteSubscription(subscription: string | GooglePubSubSubscription): Observable<void>;
    /**
     * Register a listener for from `message` events on the PubSub client for the
     * supplied subscription
     * @param subscription
     * @returns
     */
    listenForMessages(subscription: string | Subscription): Observable<GooglePubSubMessage>;
    getMessageIterator(subscription: string | Subscription): AsyncGenerator<GooglePubSubMessage[]>;
    /**
     * Get a Topic instance from the PubSub client. If a Topic instance is supplied
     * then the returned Topic will point to the same instance.
     * @param _topic
     * @returns
     */
    getTopic(_topic: string | GooglePubSubTopic): GooglePubSubTopic;
    /**
     * Returns a boolean indicating if the requested Topic exists
     * @param subscription
     * @returns
     */
    topicExists(topic: string | GooglePubSubTopic): Observable<boolean>;
    /**
     * Attempts to create a new Topic instance
     * @param _subscription
     * @param _topic
     * @returns
     */
    createTopic(topic: string | GooglePubSubTopic): Observable<GooglePubSubTopic>;
    /**
     * Attempts to delete a Topic instance
     * @param topic
     * @returns
     */
    deleteTopic(topic: string | GooglePubSubTopic): Observable<void>;
    /**
     * Returns client health information
     * @returns
     */
    getHealth(): ClientHealthInfo;
    /**
     * Dispatch an outgoing message event
     * @param packet
     * @returns
     */
    protected dispatchEvent(packet: ClientGooglePubSubOutgoingRequestSerializedData): Promise<any>;
    /**
     * Parses the response from a `.exists()` call on either a Topic or Subscription
     */
    private parseExistsResponse;
    /**
     * Indicates if the provided value is a Topic instance
     * @param topic
     */
    private isTopicInstance;
    /**
     * Indicates if the provided value is a Subscription instance
     * @param subscription
     */
    private isSubscriptionInstance;
    /**
     * This refers to an internal publish method to NestJS, please use `publishToTopic`.
     */
    protected publish(): any;
}
//# sourceMappingURL=client-google-pubsub.d.ts.map