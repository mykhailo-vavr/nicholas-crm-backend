import { Role } from '@prisma/client';
import { UserTokenData } from 'src/types';

export type Permission =
  /**
   * Дозволи для таблиці користувачів
   */
  | 'user:create'
  | 'user:read'
  | 'user:update'

  /**
   * Дозволи для таблиці волонтерів
   */
  | 'volunteer:create'
  | 'volunteer:read'
  | 'volunteer:update'

  /**
   * Дозволи для таблиці дітей
   */
  | 'child:create'
  | 'child:read'
  | 'child:update';

export const ROLE_PERMISSIONS = {
  superAdmin: [
    'user:create',
    'user:read',
    'user:update',

    'volunteer:create',
    'volunteer:read',
    'volunteer:update',

    'child:create',
    'child:read',
    'child:update',
  ],
  admin: [],
  volunteer: [],
} satisfies Record<Role, Permission[]>;

export function hasPermission({ roles }: Pick<UserTokenData, 'roles'>, permission: Permission) {
  // @ts-expect-error - помилка TS з includes
  return roles.some((role) => ROLE_PERMISSIONS[role].includes(permission));
}
