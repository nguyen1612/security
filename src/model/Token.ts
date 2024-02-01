import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Token {
    @Prop()
    userId: mongoose.Types.ObjectId;

    @Prop()
    tokens: [mongoose.Types.ObjectId];
}

export const TokenSchema = SchemaFactory.createForClass(Token);