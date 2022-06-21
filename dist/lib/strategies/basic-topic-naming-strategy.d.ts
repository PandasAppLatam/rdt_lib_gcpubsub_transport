import { TopicNamingStrategy } from '../interfaces';
/**
 * The default strategy for naming topics
 *
 * @remarks
 * When used, the initial string value will remain the same. A topic
 * passed in as `'hello-world'` will create the topic name `'hello-world'`.
 */
export declare class BasicTopicNamingStrategy implements TopicNamingStrategy {
    generateTopicName(s: string): string;
}
//# sourceMappingURL=basic-topic-naming-strategy.d.ts.map