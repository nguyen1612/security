import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from './jwt/jwt.module';
import { AuthMiddleware } from './middleware/authen';

@Module({
imports: [JwtModule],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware)
                .forRoutes("auth/*");
    }
}
