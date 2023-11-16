import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Prisma } from 'src/types';

export interface IPaginationQuery {
  page?: number;
  limit?: number;
}

export interface ISearchQuery {
  search?: string;
}

export interface ISortQuery<T extends Record<string, string>> {
  sort?: T[string];
  order?: Prisma.SortOrder;
}

export type GetSortQueryParams = { sortEnum: Record<string, string>; sortEnumName: `${string}SortFieldsEnum` };

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
