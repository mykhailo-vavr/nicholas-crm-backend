import { ApiProperty } from '@nestjs/swagger';
import { Gift, Gender, GiftSubtype, GiftType } from 'src/types';

export class GiftBaseResponse implements Gift {
  id: number;

  name: string;

  @ApiProperty({ enum: GiftType, enumName: 'GiftTypeEnum' })
  type: GiftType;

  @ApiProperty({ enum: GiftSubtype, enumName: 'GiftSubtypeEnum' })
  subtype: GiftSubtype;

  @ApiProperty({ enum: Gender, enumName: 'GenderEnum' })
  forGender: Gender;

  description: string | null;

  minAge: number;

  maxAge: number;

  requiredQuantity: number | null;

  currentQuantity: number;

  createdAt: Date;

  updatedAt: Date;
}
