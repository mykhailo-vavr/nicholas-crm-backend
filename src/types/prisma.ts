import { Prisma } from '@prisma/client';

export type PrismaModel = Capitalize<Prisma.TypeMap['meta']['modelProps']>;

export type PrismaModelKeys<M extends PrismaModel> = Extract<
  keyof (typeof Prisma)[keyof Pick<typeof Prisma, `${M}ScalarFieldEnum`>],
  string
>;

export type PrismaModelExcludedKeys<M extends PrismaModel, K> = Exclude<PrismaModelKeys<M>, K>;

export * from '@prisma/client';
