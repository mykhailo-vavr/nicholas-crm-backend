import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { DatabaseNamespaceKeysEnum, databaseNamespace } from 'src/database/namespace';

// TODO: service for namespaces
// TODO: Refactor this service

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async createTransaction<T>(f: (t: Prisma.TransactionClient) => Promise<T>) {
    const transactionResult = await this.$transaction(async (tx) =>
      databaseNamespace.runPromise(async () => {
        databaseNamespace.set(DatabaseNamespaceKeysEnum.TRANSACTION, tx);

        const result = await f(tx);

        databaseNamespace.set(DatabaseNamespaceKeysEnum.TRANSACTION, null);
        return result;
      }),
    );

    return transactionResult;
  }

  client() {
    const client: PrismaClient | Prisma.TransactionClient =
      databaseNamespace.get(DatabaseNamespaceKeysEnum.TRANSACTION) ?? this;

    return client;
  }

  // async findManyAndCount(modelName: Uncapitalize<PrismaModel>) {
  //   const [items, total] = await this.$transaction([
  //     this.client()[modelName].findMany(),
  //     this.client()[modelName].count(),
  //   ]);

  //   return [items, total];
  // }
}
