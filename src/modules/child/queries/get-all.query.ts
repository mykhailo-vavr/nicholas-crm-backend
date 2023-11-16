import { Prisma } from 'src/types';
import { getGeneralGetAllQuery } from 'src/utils';

export const GetAllChildrenQuery = getGeneralGetAllQuery({
  sortEnum: Prisma.ChildScalarFieldEnum,
  sortEnumName: 'ChildSortFieldsEnum',
});

export type GetAllChildrenQuery = InstanceType<typeof GetAllChildrenQuery>;
