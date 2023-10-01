import { getApp } from './app';
import { ConfigService } from './common';
import { setupDocs } from './docs';

const bootstrap = async () => {
  const app = await getApp();

  const configService = app.get(ConfigService);

  setupDocs(configService.get('DOCS_URL'), app);

  await app.listen(configService.get('APP_PORT'));
};

bootstrap();
