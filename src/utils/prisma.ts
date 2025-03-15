import { Prisma } from '@prisma/client';
import { PrismaModel, PrismaModelExcludedKeys, PrismaModelKeys } from 'src/types';

export function excludeColumns<M extends PrismaModel, K extends PrismaModelKeys<M>>(model: M, columns: K[]) {
  const result = {} as Record<PrismaModelExcludedKeys<M, K>, true>;

  for (const key in Prisma[`${model}ScalarFieldEnum`]) {
    if (!columns.includes(key as K)) {
      result[key as PrismaModelExcludedKeys<M, K>] = true;
    }
  }

  return result;
}

export function getPaginationOptions({ page = 0, limit = 20 }: { page?: number; limit?: number }) {
  return {
    skip: page * limit,
    take: limit,
  };
}

export function getSortOptions({ sort, order }: { sort: string; order: Prisma.SortOrder }) {
  return {
    orderBy: { [sort]: order },
  };
}

export function formatPaginatedResponse<T>({ items, total }: { items: T[]; total: number }) {
  return {
    items,
    meta: { total },
  };
}
