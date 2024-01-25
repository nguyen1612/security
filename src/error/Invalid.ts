import { BaseError } from "./BaseError";

export class InvalidError extends BaseError {
    constructor(message: string, statusCode: number = 405) {
        super(message, statusCode);
    }
}