import { Prisma } from '@prisma/client';
import { getGeneralGetAllQuery } from 'src/utils';

export const GetAllUsersQuery = getGeneralGetAllQuery({
  sortEnum: Prisma.UserScalarFieldEnum,
  sortEnumName: 'UserSortFieldsEnum',
});

export type GetAllUsersQuery = InstanceType<typeof GetAllUsersQuery>;
