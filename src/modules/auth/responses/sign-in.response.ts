import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class SignInResponse {
  accessToken: string;
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;

  @ApiProperty({ enum: Role, enumName: 'ROLES', isArray: true })
  roles: Role[];

  isActive: boolean;
  deactivationReason: string | null;
}
