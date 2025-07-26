import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export class UpdateChildDto extends createZodDto(
  z
    .object({
      firstName: z.string().trim().min(1),
      lastName: z.string().trim().min(1),
    })
    .partial()
    .strict(),
) {}
