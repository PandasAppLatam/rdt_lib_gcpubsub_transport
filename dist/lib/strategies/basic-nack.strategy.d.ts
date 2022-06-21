import { GooglePubSubContext } from '../ctx-host';
import { AckFunction, NackFunction, NackStrategy } from '../interfaces';
export declare class BasicNackStrategy implements NackStrategy {
    nack(error: unknown, ack: AckFunction, nack: NackFunction, ctx: GooglePubSubContext): Promise<void>;
}
//# sourceMappingURL=basic-nack.strategy.d.ts.map