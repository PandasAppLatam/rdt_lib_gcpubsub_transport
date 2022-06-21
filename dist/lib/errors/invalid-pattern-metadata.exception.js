"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidPatternMetadataException = void 0;
const runtime_exception_1 = require("@nestjs/core/errors/exceptions/runtime.exception");
class InvalidPatternMetadataException extends runtime_exception_1.RuntimeException {
    constructor(pattern) {
        super(`The supplied pattern metadata is invalid: ${pattern}`);
        this.pattern = pattern;
    }
}
exports.InvalidPatternMetadataException = InvalidPatternMetadataException;
//# sourceMappingURL=invalid-pattern-metadata.exception.js.map