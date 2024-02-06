import { BaseError } from "./BaseError";

export class ExpiredError extends BaseError {
    constructor(message: string, code: number = 10) {
        super(message, code);
    }
}