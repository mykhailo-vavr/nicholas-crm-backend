import { createZodDto } from 'nestjs-zod';
import { createUserSchema } from '../dtos';

export class IsUserTakenQuery extends createZodDto(
  createUserSchema
    .pick({
      email: true,
      phone: true,
    })
    .strict(),
) {}
