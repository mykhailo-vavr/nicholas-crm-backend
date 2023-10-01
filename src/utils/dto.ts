import { ApiProperty } from '@nestjs/swagger';

export class MetaDto {
  @ApiProperty()
  total: number;
}

export class PaginatedDto<T> {
  @ApiProperty({ type: MetaDto })
  meta: MetaDto;

  items: T[];
}
