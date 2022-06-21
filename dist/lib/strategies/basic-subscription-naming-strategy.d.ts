import { SubscriptionNameDependencies, SubscriptionNamingStrategy } from '../interfaces';
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
export declare class BasicSubscriptionNamingStrategy implements SubscriptionNamingStrategy {
    generateSubscriptionName(deps: SubscriptionNameDependencies): string;
}
//# sourceMappingURL=basic-subscription-naming-strategy.d.ts.map