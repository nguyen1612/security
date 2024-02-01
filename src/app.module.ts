import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { JwtModule } from './jwt/jwt.module';
import { AuthMiddleware } from './middleware/authen';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/test'),
        JwtModule
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware)
                .forRoutes({ path: "auth/*", method: RequestMethod.ALL });
    }
}
