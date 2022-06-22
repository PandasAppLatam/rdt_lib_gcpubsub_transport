"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicNackStrategy = void 0;
class BasicNackStrategy {
    nack(error, ack, nack, ctx) {
        if (ctx.getAutoNack()) {
            nack();
        }
        return Promise.resolve();
    }
}
exports.BasicNackStrategy = BasicNackStrategy;
//# sourceMappingURL=basic-nack.strategy.js.map