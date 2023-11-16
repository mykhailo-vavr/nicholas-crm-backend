import { ApiProperty } from '@nestjs/swagger';
import { Child, Gender, NeedStatus } from 'src/types';
import { BaseAddressResponse } from 'src/modules/address/responses/base.response';

export class ChildBaseResponse implements Omit<Child, 'addressId'> {
  id: number;

  firstName: string;

  lastName: string;

  birthYear: number;

  @ApiProperty({ enum: Gender, enumName: 'GenderEnum' })
  gender: Gender;

  phone: string;

  notes: string | null;

  @ApiProperty({ enum: NeedStatus, enumName: 'NeedStatusEnum' })
  needStatus: NeedStatus;

  isActive: boolean;

  deactivationReason: string | null;

  createdAt: Date;

  updatedAt: Date;

  @ApiProperty({ type: BaseAddressResponse })
  address: BaseAddressResponse;
}
