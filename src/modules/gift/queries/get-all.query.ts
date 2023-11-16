import { Prisma } from '@prisma/client';
import { getGeneralGetAllQuery } from 'src/utils';

export const GetAllGiftsQuery = getGeneralGetAllQuery({
  sortEnum: Prisma.GiftScalarFieldEnum,
  sortEnumName: 'GiftSortFieldsEnum',
});

export type GetAllGiftsQuery = InstanceType<typeof GetAllGiftsQuery>;
