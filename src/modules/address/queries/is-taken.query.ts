import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import { createAddressSchema } from '../dtos';

export class IsAddressTakenQuery extends createZodDto(
  createAddressSchema
    .pick({
      city: true,
      street: true,
      streetNumber: true,
    })
    .extend({
      flatNumber: z.pipeline(z.coerce.number().optional(), createAddressSchema.shape.flatNumber),
    })
    .strict(),
) {}
