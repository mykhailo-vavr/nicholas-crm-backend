import { createZodDto } from 'nestjs-zod';
import { emailSchema, passwordSchema } from 'src/utils';
import { z } from 'zod';

export class SignInDto extends createZodDto(
  z
    .object({
      email: emailSchema,
      password: passwordSchema,
    })
    .strict(),
) {}
