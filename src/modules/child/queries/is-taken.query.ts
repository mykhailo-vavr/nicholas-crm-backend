import { createZodDto } from 'nestjs-zod';
import { createChildSchema } from '../dtos';

export class IsChildTakenQuery extends createZodDto(
  createChildSchema
    .pick({
      firstName: true,
      lastName: true,
      birthYear: true,
      phone: true,
    })
    .strict(),
) {}
