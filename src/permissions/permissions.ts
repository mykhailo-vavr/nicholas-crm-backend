import { Role } from '@prisma/client';

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
  | 'volunteer:update';

export const ROLE_PERMISSIONS = {
  superAdmin: ['user:create', 'user:read', 'user:update', 'volunteer:create', 'volunteer:read', 'volunteer:update'],
  admin: [],
  volunteer: [],
} satisfies Record<Role, Permission[]>;

export function hasPermission(roles: Role[], permission: Permission) {
  // @ts-expect-error - помилка TS з includes
  return roles.some((role) => ROLE_PERMISSIONS[role].includes(permission));
}
