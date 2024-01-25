import { HttpException } from "@nestjs/common";

export abstract class BaseError extends HttpException {
    constructor(public message: string, public statusCode: number) {
        super({ message, statusCode }, statusCode);
    }
}