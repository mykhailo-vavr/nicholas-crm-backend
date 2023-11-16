import { ApiProperty } from '@nestjs/swagger';
import { Gender, NeedStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsPhoneNumber,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from 'src/modules/address';
import { getCurrentYear } from 'src/utils';

// TODO: create custom validator to validate 'less than current year'

export class CreateChildDto {
  @MaxLength(20)
  @IsNotEmpty()
  firstName: string;

  @MaxLength(20)
  @IsNotEmpty()
  lastName: string;

  @Min(2000)
  @Max(getCurrentYear())
  @IsInt()
  birthYear: number;

  @ApiProperty({ enum: Gender, enumName: 'GenderEnum' })
  @IsEnum(Gender)
  gender: Gender;

  @IsPhoneNumber('UA')
  phone: string;

  @IsOptional()
  @MinLength(1)
  notes?: string;

  @ApiProperty({ enum: NeedStatus, enumName: 'NeedStatusEnum' })
  @IsEnum(NeedStatus)
  needStatus: NeedStatus;

  @ApiProperty({ type: CreateAddressDto })
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
