import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

interface IPaginationQuery {
  page?: number;
  limit?: number;
}

interface ISearchQuery {
  search?: string;
}

interface ISortQuery<T extends Record<string, string>> {
  sort?: T[string];
  order?: Prisma.SortOrder;
}

type GetSortQueryParams = { sortEnum: Record<string, string>; sortEnumName: `${string}SortFieldsEnum` };

/**
 * @deprecated use nestjs-zod instead
 */
export const getGeneralGetAllQuery = ({ sortEnum, sortEnumName }: GetSortQueryParams) => {
  class GetAllQuery implements IPaginationQuery, ISearchQuery, ISortQuery<typeof sortEnum> {
    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Number)
    page?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Number)
    limit?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({
      enum: sortEnum,
      enumName: sortEnumName,
    })
    @IsOptional()
    @IsEnum(sortEnum)
    sort?: (typeof sortEnum)[string];

    @ApiPropertyOptional({ enum: Prisma.SortOrder, enumName: 'SortOrderEnum' })
    @IsOptional()
    @IsEnum(Prisma.SortOrder)
    order?: Prisma.SortOrder;
  }

  return GetAllQuery;
};
