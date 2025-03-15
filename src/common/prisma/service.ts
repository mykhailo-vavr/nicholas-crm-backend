import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { DATABASE_NAMESPACE_KEYS, databaseNamespace } from 'src/database/namespace';

// TODO: service for namespaces
// TODO: Refactor this service

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async createTransaction<T>(callback: (t: Prisma.TransactionClient) => Promise<T>) {
    const transactionResult = await this.$transaction(async (tx) =>
      databaseNamespace.runPromise(async () => {
        databaseNamespace.set(DATABASE_NAMESPACE_KEYS.TRANSACTION, tx);

        const result = await callback(tx);

        databaseNamespace.set(DATABASE_NAMESPACE_KEYS.TRANSACTION, null);
        return result;
      }),
    );

    return transactionResult;
  }

  client() {
    const client: PrismaClient | Prisma.TransactionClient =
      databaseNamespace.get(DATABASE_NAMESPACE_KEYS.TRANSACTION) ?? this;

    return client;
  }
}
