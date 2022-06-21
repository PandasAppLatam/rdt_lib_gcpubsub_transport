"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GooglePubSubMessageHandler = void 0;
/* istanbul ignore file */
const microservices_1 = require("@nestjs/microservices");
function GooglePubSubMessageHandler(metadata) {
    return (0, microservices_1.EventPattern)(JSON.stringify(metadata));
}
exports.GooglePubSubMessageHandler = GooglePubSubMessageHandler;
//# sourceMappingURL=google-pubsub-message-handler.decorator.js.map