import { IsInt, IsNotEmpty, IsOptional, IsPositive, MaxLength, MinLength } from 'class-validator';

export class IsAddressTakenQuery {
  @IsNotEmpty()
  @MaxLength(30)
  city: string;

  @IsNotEmpty()
  @MaxLength(50)
  street: string;

  @IsOptional()
  @MinLength(1)
  @MaxLength(10)
  streetNumber?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  flatNumber?: number;
}
