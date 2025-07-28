import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { createChildSchema } from '../dtos';

export class IsChildTakenQuery extends createZodDto(
  createChildSchema
    .pick({
      firstName: true,
      lastName: true,
      birthYear: true,
      phone: true,
    })
    .extend({
      birthYear: z.pipeline(z.coerce.number(), createChildSchema.shape.birthYear),
    })
    .strict(),
) {}
