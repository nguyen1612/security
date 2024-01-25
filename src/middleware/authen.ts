import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { AuthorizationError } from "src/error/Authorization";
import * as jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: object
        }
    }
}


@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, response: Response, next: NextFunction) {
        try {
            let accessToken = req.get('authorization').split(' ')[1]
            const payload = jwt.verify(accessToken, "abc");
            req.user = payload;
            next();

        } catch (e) {
            return next(new AuthorizationError("Unauthorized request"));
        }
        next();
    }
}