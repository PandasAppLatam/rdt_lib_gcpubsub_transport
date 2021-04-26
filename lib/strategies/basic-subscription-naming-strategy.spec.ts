import { BasicSubscriptionNamingStrategy } from './basic-subscription-naming-strategy';
import { NamingDependencyTag } from '../interfaces';

const topicName = 'expendables-1';
const subscriptionName = 'totally-rocks';

describe('Basic Naming Strategy', () => {
    const strategy = new BasicSubscriptionNamingStrategy();
    it('should return a subscription name if one is supplied', () => {
        const name = strategy.generateSubscriptionName({
            _tag: NamingDependencyTag.TOPIC_AND_SUBSCRIPTION_NAMES,
            topicName,
            subscriptionName,
        });

        expect(name).toEqual(`${subscriptionName}`);
    });
    it(`should return ${topicName}-sub if no subscription name is provided`, () => {
        const name = strategy.generateSubscriptionName({
            _tag: NamingDependencyTag.TOPIC_NAME_ONLY,
            topicName,
        });

        expect(name).toEqual(`${topicName}-sub`);
    });
});
