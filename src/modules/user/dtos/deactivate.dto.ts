import { IsString } from 'class-validator';

export class DeactivateUserDto {
  @IsString()
  deactivationReason: string;
}
