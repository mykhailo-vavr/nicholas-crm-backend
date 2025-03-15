import * as cls from 'cls-hooked';
import { NAMESPACES } from 'src/utils';

// TODO: utility for namespaces

export const databaseNamespace = cls.createNamespace(NAMESPACES.DATABASE);

export const DATABASE_NAMESPACE_KEYS = {
  TRANSACTION: 'TRANSACTION',
} as const;
