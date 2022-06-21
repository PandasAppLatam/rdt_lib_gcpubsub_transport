import { Message } from '@google-cloud/pubsub';
import { BaseRpcContext } from '@nestjs/microservices/ctx-host/base-rpc.context';
import { AckFunction, NackFunction } from '../interfaces';
declare type PubSubContextArgs = [
    Message,
    string,
    boolean,
    boolean
];
/**
 * Context for an incoming Google PubSub message
 */
export declare class GooglePubSubContext extends BaseRpcContext<PubSubContextArgs> {
    constructor(args: PubSubContextArgs);
    /**
     * Returns the Pubsub Message instance
     */
    getMessage(): Message;
    /**
     * Returns the raw metadata for the handler
     */
    getRawMetadata(): string;
    getAckFunction(): AckFunction;
    /**
     * Whether the message attached to this context should be auto-acked
     */
    getAutoAck(): boolean;
    /**
     * Whether the message attached to this context should be auto-acked
     */
    private setAutoAck;
    getNackFunction(): NackFunction;
    /**
     * Whether the message attached to this context should be auto-nacked
     */
    getAutoNack(): boolean;
    /**
     * Whether the message attached to this context should be auto-nacked
     */
    private setAutoNack;
}
export {};
//# sourceMappingURL=google-pubsub.context.d.ts.map