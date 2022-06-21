"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicSubscriptionNamingStrategy = void 0;
const interfaces_1 = require("../interfaces");
/**
 * The default strategy for creating subscription names.
 *
 * @remarks
 * If the subscription name is provided, that name will be used directly.
 * If only a topic name is provided, it will be used to generate a
 * subscription name.
 *
 * This strategy only supports one subscription per topic. Implement
 * a custom strategy if you need to have more than one subscription
 * per topic.
 */
class BasicSubscriptionNamingStrategy {
    generateSubscriptionName(deps) {
        switch (deps._tag) {
            case interfaces_1.NamingDependencyTag.TOPIC_AND_SUBSCRIPTION_NAMES:
            case interfaces_1.NamingDependencyTag.SUBSCRIPTION_NAME_ONLY:
                return deps.subscriptionName;
            case interfaces_1.NamingDependencyTag.TOPIC_NAME_ONLY:
                return `${deps.topicName}-sub`;
        }
    }
}
exports.BasicSubscriptionNamingStrategy = BasicSubscriptionNamingStrategy;
//# sourceMappingURL=basic-subscription-naming-strategy.js.map