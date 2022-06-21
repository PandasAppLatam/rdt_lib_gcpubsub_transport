import { Message as GooglePubSubMessage } from '@google-cloud/pubsub';
import { Deserializer, ReadPacket } from '@nestjs/microservices';
export declare class GooglePubSubMessageDeserializer implements Deserializer<GooglePubSubMessage, ReadPacket<GooglePubSubMessage>> {
    deserialize(value: GooglePubSubMessage, options: {
        metadata: string;
    }): ReadPacket<GooglePubSubMessage>;
}
//# sourceMappingURL=google-pubsub.deserializer.d.ts.map