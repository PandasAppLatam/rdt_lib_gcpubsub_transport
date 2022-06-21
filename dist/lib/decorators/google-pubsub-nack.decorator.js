"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GooglePubSubMessageNack = exports.getNackFn = void 0;
const common_1 = require("@nestjs/common");
const getNackFn = (data, ctx) => {
    const pubSubCtx = ctx.switchToRpc().getContext();
    return pubSubCtx.getNackFunction();
};
exports.getNackFn = getNackFn;
/**
 * Retrieves the nack function from the received message
 * and disables auto nack.
 */
exports.GooglePubSubMessageNack = (0, common_1.createParamDecorator)(exports.getNackFn);
//# sourceMappingURL=google-pubsub-nack.decorator.js.map