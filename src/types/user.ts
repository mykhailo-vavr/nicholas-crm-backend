import { User } from '@prisma/client';

export type UserTokenData = {
  id: User['id'];
  role: User['role'];
};
