import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { NotFoundError } from "src/error";
import { AuthorizationError } from "src/error/Authorization";
import { ExpiredError } from "src/error/Expired";
import { InvalidError } from "src/error/Invalid";
import { nonces } from "src/modules/utils/util.service";
const md5 = require('md5');

function parseQuery(queryString): any {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

@Injectable()
export class ReplayAttackMiddleware implements NestMiddleware {
    use(req: any, res: any, next: (error?: any) => void) {
        if (req.baseUrl.includes("/nonce")) {
            return next();
        }
        req.query.stime = parseInt(req.query.stime);
        const { stime, sign, cnonce, snonce } = req.query;

        if (!stime || !sign || !cnonce || !snonce) {
            throw new NotFoundError("Params not found");
        }

        const currentTime = Math.floor((Date.now() - stime) / 1000);
        if (currentTime > 30) {
            throw new ExpiredError("Time expired");
        }

        if (!nonces[snonce]) {
            throw new InvalidError("Invalid nonce");
        }

        // console.log(req.query);
        const signServer = genSign(req.query, req?.body);
        if (signServer !== sign) {
            console.log(signServer);
            console.log(sign);
            throw new AuthorizationError("Unauthorized request");
        }

        delete nonces[snonce];
        console.log('PASS');
        next();
    }
}

const genSign = (params, body) => {
    params = {...body, ...params};
    const keyToken = 'anc';
    const sortedKeys = [];
    for (const key in params) {
        if (key !== 'sign') {
            sortedKeys.push(key);
        }
    }
    sortedKeys.sort();
    let result = '';
    sortedKeys.forEach(key => {
        result += key + params[key];
    });
    result += keyToken;
    console.log(result);

    return md5(result).toString();
}