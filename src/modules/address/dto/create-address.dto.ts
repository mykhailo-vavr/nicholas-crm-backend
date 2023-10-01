import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  street: string;

  @IsInt()
  @IsPositive()
  streetNumber: number;

  @IsInt()
  @IsPositive()
  flatNumber: number;
}
