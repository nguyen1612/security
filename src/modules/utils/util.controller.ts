import { Controller, Get } from "@nestjs/common";
import { UtilService } from "./util.service";

@Controller("util")
export class UtilController {
    constructor(private util: UtilService) {}

    @Get("nonce")
    async getNonce() {
        return this.util.getNonce();
    }
}