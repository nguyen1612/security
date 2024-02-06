import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { JwtModule } from './modules/jwt/jwt.module';
import { AuthMiddleware } from './middleware/authen';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtController } from './modules/jwt/jwt.controller';
import { ReplayAttackMiddleware } from './middleware/replay-attack';
import { UtilModule } from './modules/utils/util.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/test'),
        JwtModule,
        UtilModule
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ReplayAttackMiddleware)
                .forRoutes("*")
                // .apply(AuthMiddleware)
                // .forRoutes(JwtController); // { path: "auth/*", method: RequestMethod.ALL }
    }
}
