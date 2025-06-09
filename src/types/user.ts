import { User } from '@prisma/client';

export type UserTokenData = Pick<User, 'id' | 'roles'>;
