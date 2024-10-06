import { IsInt, IsNotEmpty, IsOptional, IsPositive, MaxLength } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @MaxLength(30)
  city: string;

  @IsNotEmpty()
  @MaxLength(50)
  street: string;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(10)
  streetNumber?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  flatNumber?: number;
}
