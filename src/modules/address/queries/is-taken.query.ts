import { createZodDto } from 'nestjs-zod';
import { createAddressSchema } from '../dtos';

export class IsAddressTakenQuery extends createZodDto(
  createAddressSchema
    .pick({
      city: true,
      street: true,
      streetNumber: true,
      flatNumber: true,
    })
    .strict(),
) {}
