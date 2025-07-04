import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import * as basicAuth from 'express-basic-auth';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 5000;

  const basicAuthUser = configService.get<string>('BASIC_AUTH_USER') || 'admin';
  const basicAuthPassword =
    configService.get<string>('BASIC_AUTH_PASSWORD') || 'password123';

  app.useGlobalPipes(new ValidationPipe());

  app.use(
    ['/api'],
    basicAuth({
      challenge: true,
      users: {
        [basicAuthUser]: basicAuthPassword,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Blog System')
    .setDescription('API for Posts, Users, Comments')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: ['http://localhost:4000', 'http://192.168.137.198:4000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(port);
  console.log(`Server is running on http://localhost:${port}`);
}

bootstrap();
