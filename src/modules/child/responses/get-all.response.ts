import { ApiProperty } from '@nestjs/swagger';
import { ChildStatus, Gender, NeedStatus } from '@prisma/client';

class GetAllChildrenItem {
  id: number;
  firstName: string;
  lastName: string;
  birthYear: number;
  phone: string | null;

  @ApiProperty({ enum: Gender, enumName: 'GENDERS' })
  gender: Gender;

  @ApiProperty({ enum: NeedStatus, enumName: 'NEED_STATUSES' })
  needStatus: NeedStatus;

  @ApiProperty({ enum: ChildStatus, enumName: 'CHILD_STATUSES' })
  status: ChildStatus;
}

export class GetAllChildrenResponse {
  items: GetAllChildrenItem[];
  total: number;
}
