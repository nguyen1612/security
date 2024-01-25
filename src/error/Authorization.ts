import { BaseError } from "./BaseError";

export class AuthorizationError extends BaseError {
    constructor(message: string, statusCode: number = 401) {
        super(message, statusCode);
    }
}