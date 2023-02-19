import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /* The ValidationPipe provides a convenient way of enforcing validation rules
     for all incoming client payloads.
     You can specify these rules by using simple annotations in your DTO! */
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
