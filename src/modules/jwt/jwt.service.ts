import { Injectable } from "@nestjs/common";
import { Password } from "src/utils";
import * as jwt from "jsonwebtoken";
import { NotFoundError } from "src/error";
import { InvalidError } from "src/error/Invalid";
import { LoginDTO, SignUpDTO } from "src/dto";
import { User, UserModel } from "src/model/User";
import { InjectModel } from "@nestjs/mongoose";
// import { client } from "src/config/redis";


/*
TODO: Implement allowList for access tokens & refresh tokens with Redis ?
*/
/*
TODO: Secure the secret key
*/
const secretKey = "abc";

@Injectable()
export class JwtService {
    // private User: ReturnType<typeof User>;

    constructor(
        @InjectModel(User.name) private user: typeof UserModel
    ) {
    }

    async login(body: LoginDTO) {
        // const redis = await client.connect();
        const { username, password } = body;

        // Check whether user is existed;
        const user = await this.user.findOne({ username });
        if (!user) {
            throw new NotFoundError("Invalid username/password");
        }

        // Compare password
        const isMatchedPassword = await Password.compare(user.password, password);
        if (!isMatchedPassword) {
            throw new InvalidError("Invalid username/password");
        }

        // Generate JWT token
        const accessToken = jwt.sign({ username }, secretKey);
        // const refreshToken = jwt.sign({ username }, secretKey);

        return { accessToken };
    }

    async signup(body: SignUpDTO) {
        const { username, password, address } = body;

        const user = await this.user.findOne({username});
        if (user) {
            console.log(user);
            throw new InvalidError("Username is aldready existed");
        }

        const hashedPassword = await Password.hash(password);
        const newUser = await this.user.create({
            username,
            password: hashedPassword,
            address
        });
        await newUser.save();

        return { message: "Success" };
    }

    async getData(query, param, header) {
        const { id } = param;
        const { dob } = query;

        console.log('HEllo World00');
        // Get access token from the header
        const accessToken = header['authorization'].split(' ')[1];

        // Verify access token
        const payload = <any> jwt.verify(accessToken, secretKey);
        if (!payload) {
            throw new NotFoundError("Unauthorized");
        }

        // // Start query data from database
        // const user = this.User.findUserByUsername(payload.username);
        // if (!user) {
        //     throw new NotFoundError("Unauthorized");
        // }

        // return user.dob;
        return ""
    }
}