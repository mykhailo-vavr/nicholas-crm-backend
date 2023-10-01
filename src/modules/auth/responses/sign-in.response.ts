import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class SignInResponse {
  id: number;

  @ApiProperty({ enum: Role, enumName: 'RolesEnum' })
  role: Role;

  accessToken: string;
}
