import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

export enum EnvironmentsEnum {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

export class EnvironmentVariables {
  @IsString()
  ACCESS_TOKEN_SECRET: string;

  @IsString()
  DATABASE_URL: string;

  @IsNumber()
  APP_PORT: number;

  @IsString()
  CORS_ALLOW_ORIGINS: string;

  @IsString()
  DOCS_URL: string;

  @IsString()
  URL_PREFIX: string;

  @IsEnum(EnvironmentsEnum)
  NODE_ENV: EnvironmentsEnum;

  @IsString()
  FUNCTIONS_API_URL: string;

  @IsString()
  FUNCTIONS_API_KEY: string;

  @IsString()
  GOOGLE_MAPS_API_KEY: string;
}

export const validateEnvironmentVariables = (config: Record<string, unknown>) => {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
};
