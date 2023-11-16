import { Gender, GiftSubtype, GiftType, Prisma } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, MaxLength, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGiftDto implements Prisma.GiftCreateInput {
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({ enum: GiftType, enumName: 'GiftTypeEnum' })
  @IsEnum(GiftType)
  type: GiftType;

  @ApiProperty({ enum: GiftSubtype, enumName: 'GiftSubtypeEnum' })
  @IsEnum(GiftSubtype)
  subtype: GiftSubtype;

  @ApiProperty({ enum: Gender, enumName: 'GenderEnum' })
  @IsEnum(Gender)
  forGender: Gender;

  @IsOptional()
  @MinLength(1)
  description?: string;

  @IsInt()
  @Min(0)
  minAge: number;

  @IsInt()
  @IsPositive()
  maxAge: number;

  @IsInt()
  @Min(0)
  currentQuantity: number;
}
