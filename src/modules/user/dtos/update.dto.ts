import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export class UpdateUserDto extends createZodDto(
  z
    .object({
      firstName: z.string().trim().min(1),
      lastName: z.string().trim().min(1),
      isActive: z.boolean(),
      deactivationReason: z.string().trim().min(1).nullable(),
    })
    .partial()
    .strict(),
  // .refine((data) => (data.isActive === false) === !!data.deactivationReason, {
  //   message: "Причина деактивації обов'язкова при деактивації користувача",
  //   path: ['deactivationReason'],
  // });
) {}
