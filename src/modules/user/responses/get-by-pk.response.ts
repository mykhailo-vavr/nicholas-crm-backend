import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class GetUserByPkResponse {
  id: number;

  firstName: string;

  lastName: string;

  phone: string;

  email: string;

  @ApiProperty({ enum: Role, enumName: 'ROLES', isArray: true })
  roles: Role[];

  isActive: boolean;
}
