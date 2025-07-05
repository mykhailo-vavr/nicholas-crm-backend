import { Prisma } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export class GetAllChildrenQuery extends createZodDto(
  z
    .object({
      search: z.string().optional(),
      page: z.coerce.number().default(1),
      limit: z.coerce.number().default(10),
      sort: z
        .enum(['id', 'firstName', 'lastName', 'birthYear', 'gender', 'phone', 'address', 'needStatus', 'isActive'])
        .default('id'),
      order: z.nativeEnum(Prisma.SortOrder).default('desc'),
    })
    .strict(),
) {}
