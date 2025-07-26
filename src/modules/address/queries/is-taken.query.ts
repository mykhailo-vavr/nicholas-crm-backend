import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export class IsAddressTakenQuery extends createZodDto(
  z
    .object({
      city: z.string().trim().min(1),
      street: z.string().trim().min(1),
      streetNumber: z.string().trim().optional(),
      flatNumber: z.number().int().min(1).optional(),
    })
    .strict(),
) {}
