import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app';
import { ConfigService } from './common';

export const getApp = async () => {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.use(helmet());

  app.enableCors({
    origin: configService.get('CORS_ALLOW_ORIGINS').split(','),
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.setGlobalPrefix(configService.get('URL_PREFIX'), {
    exclude: [''],
  });

  return app;
};
