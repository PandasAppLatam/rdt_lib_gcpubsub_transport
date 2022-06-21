"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportError = void 0;
const runtime_exception_1 = require("@nestjs/core/errors/exceptions/runtime.exception");
class TransportError extends runtime_exception_1.RuntimeException {
    constructor(message, pattern, knownHandlers) {
        super(`An error has occurred in the GooglePubSub transport: ${message}`);
        this.pattern = pattern;
        this.knownHandlers = knownHandlers;
    }
}
exports.TransportError = TransportError;
//# sourceMappingURL=transport-error.exception.js.map