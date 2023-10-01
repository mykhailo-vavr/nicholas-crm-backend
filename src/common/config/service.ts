import { ConfigService as NestConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/utils';

export const ConfigService = NestConfigService<EnvironmentVariables, true>;

export type ConfigService = InstanceType<typeof ConfigService>;
