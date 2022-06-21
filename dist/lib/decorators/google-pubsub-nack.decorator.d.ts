import { ExecutionContext } from '@nestjs/common';
export declare const getNackFn: (data: unknown, ctx: ExecutionContext) => (() => void);
/**
 * Retrieves the nack function from the received message
 * and disables auto nack.
 */
export declare const GooglePubSubMessageNack: (...dataOrPipes: unknown[]) => ParameterDecorator;
//# sourceMappingURL=google-pubsub-nack.decorator.d.ts.map