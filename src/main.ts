import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { patchNestJsSwagger, ZodValidationPipe } from 'nestjs-zod';
import { ConfigService, SuperJsonInterceptor, SuperJsonPipe } from './common';
import { AppModule } from './modules/app';
import { PaginatedDto } from './utils';

async function createApp() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.use(helmet());

  app.enableCors({
    origin: configService.get('CORS_ALLOW_ORIGINS').split(','),
    credentials: true,
  });

  app.useGlobalInterceptors(new SuperJsonInterceptor());

  app.useGlobalPipes(new SuperJsonPipe(), new ZodValidationPipe());

  app.setGlobalPrefix(configService.get('URL_PREFIX'), {
    exclude: [''],
  });

  return app;
}

function setupDocs(app: INestApplication<any>) {
  const configService = app.get(ConfigService);

  patchNestJsSwagger();

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Nicholas CRM')
      .setDescription('The Nicholas CRM API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build(),
    { extraModels: [PaginatedDto] },
  );

  SwaggerModule.setup(configService.get('DOCS_URL'), app, document);
}

async function bootstrap() {
  const app = await createApp();

  setupDocs(app);

  const configService = app.get(ConfigService);

  await app.listen(configService.get('APP_PORT'));
}

bootstrap();
