import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

class Item {
  id: number;

  firstName: string;

  lastName: string;

  phone: string;

  email: string;

  isActive: boolean;

  @ApiProperty({ enum: Role, enumName: 'ROLES', isArray: true })
  roles: Role[];
}

export class GetAllUsersResponse {
  items: Item[];
  total: number;
}
