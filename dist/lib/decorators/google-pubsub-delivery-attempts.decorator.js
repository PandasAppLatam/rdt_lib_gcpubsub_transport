"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GooglePubSubMessageDeliveryAttempts = exports.getDeliveryAttempts = void 0;
const common_1 = require("@nestjs/common");
const getDeliveryAttempts = (key, ctx) => {
    const message = ctx.switchToRpc().getContext().getMessage();
    return message.deliveryAttempt;
};
exports.getDeliveryAttempts = getDeliveryAttempts;
exports.GooglePubSubMessageDeliveryAttempts = (0, common_1.createParamDecorator)(exports.getDeliveryAttempts);
//# sourceMappingURL=google-pubsub-delivery-attempts.decorator.js.map