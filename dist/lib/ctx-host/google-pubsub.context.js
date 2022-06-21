"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GooglePubSubContext = void 0;
const base_rpc_context_1 = require("@nestjs/microservices/ctx-host/base-rpc.context");
/**
 * Context for an incoming Google PubSub message
 */
class GooglePubSubContext extends base_rpc_context_1.BaseRpcContext {
    constructor(args) {
        super(args);
    }
    /**
     * Returns the Pubsub Message instance
     */
    getMessage() {
        return this.args[0];
    }
    /**
     * Returns the raw metadata for the handler
     */
    getRawMetadata() {
        return this.args[1];
    }
    getAckFunction() {
        this.setAutoAck(false);
        return () => this.args[0].ack();
    }
    /**
     * Whether the message attached to this context should be auto-acked
     */
    getAutoAck() {
        return this.args[2];
    }
    /**
     * Whether the message attached to this context should be auto-acked
     */
    setAutoAck(value) {
        this.args[2] = value;
    }
    getNackFunction() {
        this.setAutoNack(false);
        return () => this.args[0].nack();
    }
    /**
     * Whether the message attached to this context should be auto-nacked
     */
    getAutoNack() {
        return this.args[3];
    }
    /**
     * Whether the message attached to this context should be auto-nacked
     */
    setAutoNack(value) {
        this.args[3] = value;
    }
}
exports.GooglePubSubContext = GooglePubSubContext;
//# sourceMappingURL=google-pubsub.context.js.map