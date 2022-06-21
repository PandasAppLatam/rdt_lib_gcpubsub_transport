"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GooglePubSubMessageAck = exports.getAckFn = void 0;
const common_1 = require("@nestjs/common");
const getAckFn = (data, ctx) => {
    const pubSubCtx = ctx.switchToRpc().getContext();
    return pubSubCtx.getAckFunction();
};
exports.getAckFn = getAckFn;
/**
 * Retrieves the ack function from the received message
 * and disables auto ack.
 */
exports.GooglePubSubMessageAck = (0, common_1.createParamDecorator)(exports.getAckFn);
//# sourceMappingURL=google-pubsub-ack.decorator.js.map