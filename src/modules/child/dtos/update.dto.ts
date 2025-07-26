import { createZodDto } from 'nestjs-zod';
import { firstNameSchema, lastNameSchema } from 'src/utils';
import { z } from 'zod';

export class UpdateChildDto extends createZodDto(
  z
    .object({
      firstName: firstNameSchema,
      lastName: lastNameSchema,
    })
    .partial()
    .strict(),
) {}
