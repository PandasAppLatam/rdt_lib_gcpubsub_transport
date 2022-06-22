import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';
export declare class TransportError extends RuntimeException {
    pattern: string;
    knownHandlers: string[];
    constructor(message: string, pattern: string, knownHandlers: string[]);
}
//# sourceMappingURL=transport-error.exception.d.ts.map