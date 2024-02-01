import { IsString } from "class-validator";

export class LoginDTO {
    @IsString()
    username: string;

    @IsString()
    password: string;
}

export class SignUpDTO {
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    address: string;
}