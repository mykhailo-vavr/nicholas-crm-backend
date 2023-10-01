import { Gender } from '@prisma/client';
import { IsBoolean, IsDateString, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateChildDto {
  @IsNotEmpty()
  deactivationReason: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsBoolean()
  isActive: boolean;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsDateString()
  birthDate: string;
}
