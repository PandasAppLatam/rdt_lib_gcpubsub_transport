"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicTopicNamingStrategy = void 0;
/**
 * The default strategy for naming topics
 *
 * @remarks
 * When used, the initial string value will remain the same. A topic
 * passed in as `'hello-world'` will create the topic name `'hello-world'`.
 */
class BasicTopicNamingStrategy {
    generateTopicName(s) {
        return s;
    }
}
exports.BasicTopicNamingStrategy = BasicTopicNamingStrategy;
//# sourceMappingURL=basic-topic-naming-strategy.js.map