import { Prisma, PrismaModel, PrismaModelExcludedKeys, PrismaModelKeys } from 'src/types';

export const excludeColumns = <M extends PrismaModel, K extends PrismaModelKeys<M>>(model: M, columns: K[]) => {
  const result = {} as Record<PrismaModelExcludedKeys<M, K>, true>;

  for (const key in Prisma[`${model}ScalarFieldEnum`]) {
    if (!columns.includes(key as K)) {
      result[key as PrismaModelExcludedKeys<M, K>] = true;
    }
  }

  return result;
};

export const getPaginationOptions = ({ page = 0, limit = 20 }: { page?: number; limit?: number }) => ({
  skip: page * limit,
  take: limit,
});

export const getSortOptions = ({ sort, order }: { sort: string; order: Prisma.SortOrder }) => ({
  orderBy: { [sort]: order },
});

export const formatPaginatedResponse = <T>({ items, total }: { items: T[]; total: number }) => ({
  items,
  meta: { total },
});
