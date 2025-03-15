import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

const ENVIRONMENTS = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
} as const;

type Environment = (typeof ENVIRONMENTS)[keyof typeof ENVIRONMENTS];

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

  @IsEnum(ENVIRONMENTS)
  NODE_ENV: Environment;

  @IsString()
  FUNCTIONS_API_URL: string;

  @IsString()
  FUNCTIONS_API_KEY: string;

  @IsString()
  GOOGLE_MAPS_API_KEY: string;
}

export function validateEnvironmentVariables(config: Record<string, any>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
