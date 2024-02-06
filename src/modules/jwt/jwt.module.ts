import { Module } from "@nestjs/common";
import { JwtController } from "./jwt.controller";
import { JwtService } from "./jwt.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/model/User";
import { models } from "src/model";

@Module({
    imports: [
        MongooseModule.forFeature(models),
    ],
    controllers: [JwtController],
    providers: [JwtService]
})
export class JwtModule {}