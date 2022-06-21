"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GooglePubSubMessageDeserializer = void 0;
class GooglePubSubMessageDeserializer {
    deserialize(value, options) {
        return {
            pattern: options.metadata,
            data: value,
        };
    }
}
exports.GooglePubSubMessageDeserializer = GooglePubSubMessageDeserializer;
//# sourceMappingURL=google-pubsub.deserializer.js.map