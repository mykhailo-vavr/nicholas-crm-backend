import { Role } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { emailSchema, firstNameSchema, lastNameSchema, passwordSchema, phoneSchema } from 'src/utils';
import { z } from 'zod';

export const createUserSchema = z
  .object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    phone: phoneSchema,
    email: emailSchema,
    roles: z.array(z.nativeEnum(Role)),
    password: passwordSchema,
  })
  .strict();

export class CreateUserDto extends createZodDto(createUserSchema) {}
