"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GooglePubSubMessageMessageAttributes = exports.getMessageAttrs = void 0;
const common_1 = require("@nestjs/common");
const getMessageAttrs = (key, ctx) => {
    const message = ctx.switchToRpc().getContext().getMessage();
    const attrs = message.attributes;
    if (attrs != null && key != null) {
        return attrs[key];
    }
    return attrs;
};
exports.getMessageAttrs = getMessageAttrs;
exports.GooglePubSubMessageMessageAttributes = (0, common_1.createParamDecorator)(exports.getMessageAttrs);
//# sourceMappingURL=google-pubsub-message-attributes.decorator.js.map