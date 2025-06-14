import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export class SignInDto extends createZodDto(
  z
    .object({
      email: z.string().email(),
      password: z.string().trim().min(1),
    })
    .strict(),
) {}
