import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';
import { MetadataKeysEnum } from 'src/utils';

export const Roles = (...roles: Role[]) =>
  SetMetadata(MetadataKeysEnum.ROLES, roles);
