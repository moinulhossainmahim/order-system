import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiModule } from './api.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip fields not in the DTO
      forbidNonWhitelisted: true, // ...or reject the request if they are sent
      transform: true, // turn the JSON body into a real CreateOrderDto
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Order System API')
    .setVersion('1.0')
    .build();
  SwaggerModule.setup(
    'docs',
    app,
    SwaggerModule.createDocument(app, swaggerConfig),
  );

  await app.listen(process.env.port ?? 3003);
}

bootstrap();
