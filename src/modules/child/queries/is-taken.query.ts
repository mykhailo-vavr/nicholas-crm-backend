import { createZodDto } from 'nestjs-zod';
import { getCurrentYear } from 'src/utils';
import { z } from 'zod';

export class IsChildTakenQuery extends createZodDto(
  z
    .object({
      firstName: z.string().trim().min(1),
      lastName: z.string().trim().min(1),
      birthYear: z.coerce
        .number()
        .int()
        .min(getCurrentYear() - 100)
        .max(getCurrentYear()),
      phone: z.string().regex(/^380\d{9}$/),
    })
    .strict(),
) {}
