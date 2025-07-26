import { createZodDto } from 'nestjs-zod';
import { firstNameSchema, lastNameSchema, stringSchema } from 'src/utils';
import { z } from 'zod';

export class UpdateUserDto extends createZodDto(
  z
    .object({
      firstName: firstNameSchema,
      lastName: lastNameSchema,
      isActive: z.boolean(),
      deactivationReason: stringSchema.nullable(),
    })
    .partial()
    .strict(),
  // .refine((data) => (data.isActive === false) === !!data.deactivationReason, {
  //   message: "Причина деактивації обов'язкова при деактивації користувача",
  //   path: ['deactivationReason'],
  // });
) {}
