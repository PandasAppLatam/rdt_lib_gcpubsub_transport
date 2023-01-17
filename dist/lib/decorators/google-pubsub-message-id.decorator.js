"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GooglePubSubMessageId = exports.getMessageId = void 0;
const common_1 = require("@nestjs/common");
const getMessageId = (key, ctx) => {
    const message = ctx.switchToRpc().getContext().getMessage();
    return message.id;
};
exports.getMessageId = getMessageId;
exports.GooglePubSubMessageId = (0, common_1.createParamDecorator)(exports.getMessageId);
//# sourceMappingURL=google-pubsub-message-id.decorator.js.map