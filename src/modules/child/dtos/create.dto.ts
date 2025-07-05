import { ChildStatus, Gender, NeedStatus } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { getCurrentYear } from 'src/utils';
import { z } from 'zod';

export const createChildSchema = z
  .object({
    firstName: z.string().trim().min(1),
    lastName: z.string().trim().min(1),
    birthYear: z
      .number()
      .int()
      .min(getCurrentYear() - 100)
      .max(getCurrentYear()),
    gender: z.nativeEnum(Gender),
    phone: z.string().regex(/^380\d{9}$/),
    notes: z.string().optional(),
    needStatus: z.nativeEnum(NeedStatus),
    status: z.nativeEnum(ChildStatus),
  })
  .strict();

export class CreateChildDto extends createZodDto(createChildSchema) {}
