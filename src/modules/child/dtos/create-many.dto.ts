import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { createChildSchema } from './create.dto';

export class CreateManyChildrenDto extends createZodDto(
  z
    .object({
      items: z.array(createChildSchema),
    })
    .strict(),
) {}
