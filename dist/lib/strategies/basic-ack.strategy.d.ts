import { GooglePubSubContext } from '../ctx-host';
import { AckFunction, AckStrategy, NackFunction } from '../interfaces';
export declare class BasicAckStrategy implements AckStrategy {
    ack(ack: AckFunction, nack: NackFunction, ctx: GooglePubSubContext): Promise<void>;
}
//# sourceMappingURL=basic-ack.strategy.d.ts.map