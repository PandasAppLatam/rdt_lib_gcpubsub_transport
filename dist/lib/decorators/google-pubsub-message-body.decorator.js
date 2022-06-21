"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GooglePubSubMessageBody = exports.getMessageBody = void 0;
const common_1 = require("@nestjs/common");
const getMessageBody = (key, ctx) => {
    const message = ctx.switchToRpc().getContext().getMessage();
    try {
        const body = JSON.parse(message.data.toString());
        if (key != null) {
            return body[key];
        }
        return body;
    }
    catch (error) {
        return null;
    }
};
exports.getMessageBody = getMessageBody;
exports.GooglePubSubMessageBody = (0, common_1.createParamDecorator)(exports.getMessageBody);
//# sourceMappingURL=google-pubsub-message-body.decorator.js.map