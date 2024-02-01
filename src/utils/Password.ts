import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const asyncScrypt = promisify(scrypt);

export class Password {
    static size = 64;
    static async hash(password: string) {
        const salt = randomBytes(this.size).toString('hex');
        const buffer = <Buffer> await asyncScrypt(password, salt, this.size);
        return `${buffer.toString('hex')}.${salt}`;
    }

    static async compare(hashedPassword: string, password: string) {
        const [hashed, salt] = hashedPassword.split('.');
        const buffer = <Buffer> await asyncScrypt(password, salt, this.size);
        return buffer.toString('hex') === hashed;
    }
}