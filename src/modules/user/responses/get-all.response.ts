import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

class Item {
  id: number;

  firstName: string;

  lastName: string;

  phone: string;

  email: string;

  @ApiProperty({ enum: Role, enumName: 'ROLES', isArray: true })
  roles: Role[];

  isActive: boolean;
}

export class GetAllUsersResponse {
  items: Item[];
  total: number;
}
