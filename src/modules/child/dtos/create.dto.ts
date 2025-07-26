import { Gender, NeedStatus } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { createAddressSchema } from 'src/modules/address';
import { getCurrentYear } from 'src/utils';
import { z } from 'zod';

export const createChildSchema = z
  .object({
    firstName: z.string().trim().min(1),
    lastName: z.string().trim().min(1),
    gender: z.nativeEnum(Gender),
    birthYear: z
      .number()
      .int()
      .min(getCurrentYear() - 100)
      .max(getCurrentYear()),
    phone: z.string().regex(/^380\d{9}$/),
    needStatus: z.nativeEnum(NeedStatus),
    notes: z.string().optional(),
    address: createAddressSchema,
  })
  .strict();

export class CreateChildDto extends createZodDto(createChildSchema) {}
