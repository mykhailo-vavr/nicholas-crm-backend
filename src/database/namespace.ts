import * as cls from 'cls-hooked';
import { NamespacesEnum } from 'src/utils';

// TODO: utility for namespaces

export const databaseNamespace = cls.createNamespace(NamespacesEnum.DATABASE);

export enum DatabaseNamespaceKeysEnum {
  TRANSACTION = 'transaction',
}
