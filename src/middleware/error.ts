import { ArgumentsHost, Catch, HttpException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Response } from "express";
import { BaseError } from "src/error/BaseError";

@Catch()
export class AllErrors extends BaseExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const body = exception instanceof BaseError
                        ? exception.getResponse()
                        : { statusCode: 500, message: 'Internal Server Error' };
        response.status(200).json(body);
    }
}