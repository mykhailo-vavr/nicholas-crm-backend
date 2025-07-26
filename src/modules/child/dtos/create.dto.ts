import { Gender, NeedStatus } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { createAddressSchema } from 'src/modules/address';
import { firstNameSchema, getCurrentYear, lastNameSchema, phoneSchema, stringSchema } from 'src/utils';
import { z } from 'zod';

export const createChildSchema = z
  .object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    gender: z.nativeEnum(Gender),
    birthYear: z
      .number()
      .int()
      .min(getCurrentYear() - 100)
      .max(getCurrentYear()),
    phone: phoneSchema,
    needStatus: z.nativeEnum(NeedStatus),
    notes: stringSchema.optional(),
    address: createAddressSchema,
  })
  .strict();

export class CreateChildDto extends createZodDto(createChildSchema) {}
