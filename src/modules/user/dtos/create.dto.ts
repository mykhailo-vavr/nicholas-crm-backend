import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma, Role } from '@prisma/client';

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsPhoneNumber('UA')
  phone: string;

  @IsEmail()
  email: string;

  @ApiProperty({ enum: Role, enumName: 'RolesEnum' })
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  @IsString()
  password: string;
}
