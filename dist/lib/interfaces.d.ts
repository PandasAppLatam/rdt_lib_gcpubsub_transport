/// <reference types="node" />
import { Attributes, ClientConfig, CreateSubscriptionOptions, Message, PubSub, Subscription, Topic } from '@google-cloud/pubsub';
import { ReadPacket } from '@nestjs/microservices';
import { ClientGooglePubSub } from './client';
import { GooglePubSubContext } from './ctx-host';
export declare type GooglePubSubMessage = Message;
export declare type GooglePubSubMessageAttributes = Attributes;
export declare type GooglePubSubTopic = Topic;
export declare type GooglePubSubSubscription = Subscription;
export declare type AckFunction = () => void;
export declare type NackFunction = () => void;
export interface GooglePubSubSubscriptionPatternMetadata {
    subscriptionName: string;
    createOptions?: CreateSubscriptionOptions;
    oneAtATime?: boolean;
    topicName?: string;
}
export interface GooglePubSubTopicPatternMetadata {
    subscriptionName?: string;
    createOptions?: CreateSubscriptionOptions;
    oneAtATime?: boolean;
    topicName: string;
}
export declare type GooglePubSubPatternMetadata = GooglePubSubSubscriptionPatternMetadata | GooglePubSubTopicPatternMetadata;
export interface GooglePubSubTransportOptions {
    client?: ClientGooglePubSub;
    createSubscriptions?: boolean;
    autoAck?: boolean;
    autoNack?: boolean;
    oneAtATime?: boolean;
    subscriptionNamingStrategy?: SubscriptionNamingStrategy;
    topicNamingStrategy?: TopicNamingStrategy;
    ackStrategy?: AckStrategy;
    nackStrategy?: NackStrategy;
}
export declare enum NamingDependencyTag {
    TOPIC_NAME_ONLY = "TopicNameOnly",
    SUBSCRIPTION_NAME_ONLY = "SubscriptionNameOnly",
    TOPIC_AND_SUBSCRIPTION_NAMES = "TopicAndSubscriptionNames"
}
export interface TopicNameOnly {
    _tag: NamingDependencyTag.TOPIC_NAME_ONLY;
    topicName: string;
}
export interface SubscriptionNameOnly {
    _tag: NamingDependencyTag.SUBSCRIPTION_NAME_ONLY;
    subscriptionName: string;
}
export interface TopicAndSubscriptionNames {
    _tag: NamingDependencyTag.TOPIC_AND_SUBSCRIPTION_NAMES;
    topicName: string;
    subscriptionName: string;
}
/**
 * The possible configurations for producing a subscription name.
 *
 * @remarks
 * This allows the writer of a custom `SubscriptionNamingStrategy` to
 * conveniently switch on the `_tag` member to enforce handling of all
 * possible combinations of subscription and topic names.
 *
 * @see BasicSubscriptionNamingStrategy
 */
export declare type SubscriptionNameDependencies = TopicNameOnly | SubscriptionNameOnly | TopicAndSubscriptionNames;
export declare type GenerateSubscriptionName = (deps: SubscriptionNameDependencies) => string;
export interface SubscriptionNamingStrategy {
    generateSubscriptionName: GenerateSubscriptionName;
}
export declare type GenerateTopicName = (initialName: string) => string;
/**
 * Provides a method for renaming topics before creating subscriptions for them.
 *
 * @remarks
 * Consider a service in which the name of the topic used depends upon an
 * environment variable. When configuring the handler decorator, you would
 * have to provide a static value for the topic name. Decorator arguments
 * being static for Nest's event handling prevents a function from being
 * passed in. Instead, if names need to change dynamically at runtime,
 * create a Strategy implementing this interface to provide the necessary
 * behavior.
 *
 * @example
 * class PrefixedTopicNameStrategy implements TopicNamingStrategy {
 *     generateTopicName(originalName: string): string {
 *         return `prefix-${originalName}`
 *     }
 * }
 */
export interface TopicNamingStrategy {
    generateTopicName: GenerateTopicName;
}
export declare type AckHandler = (ack: AckFunction, nack: NackFunction, ctx: GooglePubSubContext) => Promise<void>;
export interface AckStrategy {
    ack: AckHandler;
}
export declare type NackHandler<T = unknown> = (error: T, ack: AckFunction, nack: NackFunction, ctx: GooglePubSubContext) => Promise<void>;
export interface NackStrategy {
    nack: NackHandler;
}
export interface ClientHealthInfo {
    isOpen: boolean;
    isEmulator: boolean;
    projectId: string;
}
export interface GooglePubSubOptions {
    pubSubClient?: PubSub;
    pubSubClientConfig?: ClientConfig;
}
export declare type PublishData = Buffer | Record<string, any>;
export interface ClientGooglePubSubOutgoingRequestData {
    message: PublishData;
    attributes?: GooglePubSubMessageAttributes;
}
export interface ClientGooglePubSubOutgoingRequestSerializedData extends ReadPacket {
    data: ClientGooglePubSubOutgoingRequestData;
}
//# sourceMappingURL=interfaces.d.ts.map