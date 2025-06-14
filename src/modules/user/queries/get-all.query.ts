import { Prisma } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export class GetAllUsersQuery extends createZodDto(
  z
    .object({
      search: z.string().optional(),
      page: z.number().default(1),
      limit: z.number().default(10),
      sort: z.enum(['id', 'firstName', 'lastName', 'phone', 'email', 'roles', 'isActive']).default('id'),
      order: z.nativeEnum(Prisma.SortOrder).default('desc'),
    })
    .strict(),
) {}
