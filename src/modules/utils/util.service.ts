import { Injectable } from "@nestjs/common";
import * as crypto from "crypto";

export const nonces = {};

@Injectable()
export class UtilService {
    getNonce() {
        let nonce = crypto.randomBytes(64).toString('base64');
        nonces[nonce] = 1;
        return { nonce };
    }
}