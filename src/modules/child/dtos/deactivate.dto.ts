import { IsString } from 'class-validator';

export class DeactivateChildDto {
  @IsString()
  deactivationReason: string;
}
