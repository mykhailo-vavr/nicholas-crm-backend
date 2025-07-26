import { createZodDto } from 'nestjs-zod';
import { stringSchema, uaStringSchema } from 'src/utils';
import { z } from 'zod';

export const createAddressSchema = z
  .object({
    city: uaStringSchema.max(30),
    street: uaStringSchema.max(50),
    streetNumber: stringSchema.max(10).optional(),
    flatNumber: z.number().int().min(1).optional(),
    latitude: z.number(),
    longitude: z.number(),
  })
  .strict();

export class CreateAddressDto extends createZodDto(createAddressSchema) {}
