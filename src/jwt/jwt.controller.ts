import { Body, Controller, Get, Headers, Param, Post, Query } from "@nestjs/common";
import { JwtService } from "./jwt.service";
import { LoginDTO, SignUpDTO } from "src/dto";

@Controller('v1')
export class JwtController {
    constructor(private jwt: JwtService) {};

    @Post('login')
    async login(@Body() body: LoginDTO) {
        return this.jwt.login(body);
    }

    @Post('signup')
    async signup(@Body() body: SignUpDTO) {
        return this.jwt.signup(body);
    }

    @Get('user/:id')
    async getData(@Headers() header, @Query() query, @Param() param) {
        return this.jwt.getData(query, param, header);
    }
}