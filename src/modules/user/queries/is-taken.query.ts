import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export class IsUserTakenQuery extends createZodDto(
  z
    .object({
      email: z.string().email(),
      phone: z.string().regex(/^\+380\d{9}$/),
    })
    .strict(),
) {}
