import { Role } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export class CreateUserDto extends createZodDto(
  z
    .object({
      firstName: z.string().trim().min(1),
      lastName: z.string().trim().min(1),
      phone: z.string().regex(/^380\d{9}$/),
      email: z.string().email(),
      roles: z.array(z.nativeEnum(Role)),
      password: z.string().trim().min(1),
    })
    .strict(),
) {}
