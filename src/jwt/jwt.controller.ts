import { Body, Controller, Get, Headers, Param, Post, Query, Req, Res } from "@nestjs/common";
import { JwtService } from "./jwt.service";
import { LoginDTO, SignUpDTO } from "src/dto";
import { successResponse } from "src/utils/constant";
import { Response } from "express";

@Controller('v1')
export class JwtController {
    constructor(private jwt: JwtService) {};

    @Post('login')
    async login(
        @Body() body: LoginDTO,
        @Res({ passthrough: true }) response: Response
    ) {
        const token = await this.jwt.login(body);
        response.cookie('accessToken', token.accessToken, {
            sameSite: 'strict',
            httpOnly: true,
            secure: true
        });
        return successResponse;
    }

    @Post('signup')
    async signup(@Body() body: SignUpDTO) {
        return this.jwt.signup(body);
    }

    @Get('auth/user/:id')
    async getData(
        @Headers() header,
        @Query() query,
        @Param() param,
    ) {
        return this.jwt.getData(query, param, header);
    }
}