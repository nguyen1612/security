import { BaseError } from "./BaseError";

export class ValidationError extends BaseError {
    constructor(message: string, statusCode = 400) {
        super(message, statusCode);
    }
}