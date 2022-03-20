import { ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ValidationExceptions,
  ValidationExceptionBase,
} from './filters/models/validation-exception';
import { ValidationFilter } from './filters/validation-filter';
import { RequestContextMiddleware } from './middlewares/request-context.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(RequestContextMiddleware);
  //app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const validationExceptions = new Array<ValidationExceptionBase>();

        for (const error of errors) {
          validationExceptions.push(
            new ValidationExceptionBase(
              error.constraints,
              error.property,
              error.value,
            ),
          );
        }

        return new ValidationExceptions(validationExceptions);
      },
    }),
  );
  await app.listen(3003);
}
bootstrap();
