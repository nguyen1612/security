import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
    constructor(message: string, statusCode: number = 404) {
        super(message, statusCode);
    }
}