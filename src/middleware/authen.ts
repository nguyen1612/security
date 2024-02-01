import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { AuthorizationError } from "src/error/Authorization";
import * as jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: object | string
        }
    }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, response: Response, next: NextFunction) {
        try {
            console.log('HELLO')
            // Prevent replay attacks
            const { stime, sign, cnonce, snonce } = req.query;
            console.log(req.query);

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