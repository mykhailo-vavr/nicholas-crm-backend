import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateUserDto {
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

  @ApiProperty({ enum: Role, enumName: 'ROLES', isArray: true })
  @IsEnum(Role, { each: true })
  roles: Role[];

  @IsNotEmpty()
  @IsString()
  password: string;
}
