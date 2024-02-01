import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllErrors } from './middleware/error';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from './error/Validation';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors();
  app.useGlobalFilters(new AllErrors());
  app.useGlobalPipes(new ValidationPipe({
    stopAtFirstError: true,
    exceptionFactory: errors => {
      /*
      TODO: Logging the invalid type of parameters
      */
      errors.forEach(error => {
        console.log(error.constraints);
      });
      return new ValidationError("Validation failed");
    }
  }));

  await app.listen(3000);
}
bootstrap();
