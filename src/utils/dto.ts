import { ApiProperty } from '@nestjs/swagger';

/**
 * @deprecated
 */
export class MetaDto {
  @ApiProperty()
  total: number;
}

/**
 * @deprecated
 */
export class PaginatedDto<T> {
  items: T[];
}
