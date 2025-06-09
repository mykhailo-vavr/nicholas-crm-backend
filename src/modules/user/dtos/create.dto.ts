import { Role } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const createUserSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z
    .string()
    .min(1)
    .regex(/^\+380\d{9}$/),
  email: z.string().email(),
  roles: z.array(z.nativeEnum(Role)),
  password: z.string().min(1),
});

export class CreateUserDto extends createZodDto(createUserSchema) {}
