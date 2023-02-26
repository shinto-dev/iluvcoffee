import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /* The ValidationPipe provides a convenient way of enforcing validation rules
     for all incoming client payloads.
     You can specify these rules by using simple annotations in your DTO! */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip out any properties that are not defined in the DTO.
      forbidNonWhitelisted: true, // Throw an error if a client sends a property that is not defined in the DTO.
      transform: true, // Transform incoming payloads to the correct type.
      transformOptions: {
        enableImplicitConversion: true, // Allow implicit type conversion.
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}

bootstrap();
