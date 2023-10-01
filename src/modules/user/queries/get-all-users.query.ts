import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Prisma } from 'src/types';
import { PaginationQuery } from 'src/utils';

export class GetAllUsersQuery extends PaginationQuery {
  @ApiPropertyOptional({
    enum: Prisma.UserScalarFieldEnum,
    enumName: 'UserSortFieldsEnum',
  })
  @IsOptional()
  @IsEnum(Prisma.UserScalarFieldEnum)
  sort?: Prisma.UserScalarFieldEnum;

  @ApiPropertyOptional({ enum: Prisma.SortOrder, enumName: 'SortOrderEnum' })
  @IsOptional()
  @IsEnum(Prisma.SortOrder)
  order?: Prisma.SortOrder;

  @IsOptional()
  @IsString()
  search?: string;
}
