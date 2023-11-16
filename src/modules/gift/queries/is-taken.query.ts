import { IsNotEmpty, MaxLength } from 'class-validator';

export class IsGiftTakenQuery {
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}
