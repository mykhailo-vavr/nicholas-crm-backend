import { ApiProperty } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';

export class UserBaseResponse implements Omit<User, 'password'> {
  id: number;

  firstName: string;

  lastName: string;

  phone: string;

  email: string;

  @ApiProperty({ enum: Role, enumName: 'RolesEnum' })
  role: Role;

  isActive: boolean;

  deactivationReason: string | null;

  createdAt: Date;

  updatedAt: Date;
}
