import { ApiProperty } from '@nestjs/swagger';
import { ChildStatus, Gender, NeedStatus } from '@prisma/client';

export class GetChildByPkResponse {
  id: number;
  firstName: string;
  lastName: string;
  birthYear: number;
  phone: string | null;
  notes: string | null;
  Address: {
    city: string;
    street: string;
    streetNumber: string | null;
    flatNumber: number | null;
    latitude: number;
    longitude: number;
  } | null;

  @ApiProperty({ enum: Gender, enumName: 'GENDERS' })
  gender: Gender;

  @ApiProperty({ enum: NeedStatus, enumName: 'NEED_STATUSES' })
  needStatus: NeedStatus;

  @ApiProperty({ enum: ChildStatus, enumName: 'CHILD_STATUSES' })
  status: ChildStatus;
}
