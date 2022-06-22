"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicAckStrategy = void 0;
class BasicAckStrategy {
    ack(ack, nack, ctx) {
        if (ctx.getAutoAck()) {
            ack();
        }
        return Promise.resolve();
    }
}
exports.BasicAckStrategy = BasicAckStrategy;
//# sourceMappingURL=basic-ack.strategy.js.map