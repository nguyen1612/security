import { Injectable } from "@nestjs/common";
import { Password } from "src/utils";
import * as jwt from "jsonwebtoken";
import { NotFoundError } from "src/error";
import { InvalidError } from "src/error/Invalid";
import { LoginDTO, SignUpDTO } from "src/dto";

/*
TODO: Implement database. However, for current demo, use array instead
*/
interface UserModel extends SignUpDTO {}
const User = () => {
    const data: UserModel[] = [];
    return {
        findUserByUsername: (username: string) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i]['username'] === username)
                    return data[i];
            }
            return null;
        },
        insert(payload: UserModel) {
            data.push(payload);
        }
    }
}
/*
TODO: Secure the secret key
*/
const secretKey = "abc";

@Injectable()
export class JwtService {
    private User: ReturnType<typeof User>;

    constructor() {
        this.User = User();
    }

    async login(body: LoginDTO) {
        const { username, password } = body;

        // Check whether user is existed;
        const user = this.User.findUserByUsername(username);
        if (!user) {
            throw new NotFoundError("Invalid username/password");
        }

        // Compare password
        const hashedPassword = await Password.hash(password);
        if (hashedPassword !== user.password) {
            throw new InvalidError("Invalid username/password");
        }

        // Generate JWT token
        const accessToken = jwt.sign({ username }, secretKey, { expiresIn: '15s' });
        const refreshToken = jwt.sign({ username }, secretKey);

        return { accessToken, refreshToken };
    }

    async signup(body: SignUpDTO) {
        this.User.insert(body);
        return { message: "Success" };
    }

    async getData(query, param, header) {
        console.log('REACH');
        const { id } = param;
        const { dob } = query;

        // Get access token from the header
        const accessToken = header['authorization'].split(' ')[1];

        // Verify access token
        const payload = <any> jwt.verify(accessToken, secretKey);
        if (!payload) {
            throw new NotFoundError("Unauthorized");
        }

        // Start query data from database
        const user = this.User.findUserByUsername(payload.username);
        if (!user) {
            throw new NotFoundError("Unauthorized");
        }

        return user.dob;
    }
}