import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsPhoneNumber,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from 'src/modules/address';

export class IsChildTakenDto {
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsInt()
  birthYear: number;

  @IsPhoneNumber('UA')
  @IsString()
  phone: string;

  @ApiProperty({ type: CreateAddressDto })
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
