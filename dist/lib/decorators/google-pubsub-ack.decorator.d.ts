import { ExecutionContext } from '@nestjs/common';
export declare const getAckFn: (data: unknown, ctx: ExecutionContext) => (() => void);
/**
 * Retrieves the ack function from the received message
 * and disables auto ack.
 */
export declare const GooglePubSubMessageAck: (...dataOrPipes: unknown[]) => ParameterDecorator;
//# sourceMappingURL=google-pubsub-ack.decorator.d.ts.map