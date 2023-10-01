import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PaginatedDto } from './utils';

export const setupDocs = (url: string, app: INestApplication<any>) => {
  const config = new DocumentBuilder()
    .setTitle('Nicholas CRM')
    .setDescription('The Nicholas CRM API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [PaginatedDto],
  });

  SwaggerModule.setup(url, app, document);
};
