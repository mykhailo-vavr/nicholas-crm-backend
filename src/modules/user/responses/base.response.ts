import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UserBaseResponse {
  id: number;

  firstName: string;

  lastName: string;

  phone: string;

  email: string;

  @ApiProperty({ enum: Role, enumName: 'RolesEnum' })
  role: Role;

  createdAt: Date;

  updatedAt: Date;
}
