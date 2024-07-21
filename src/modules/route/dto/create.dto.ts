import { IsInt, IsPositive } from 'class-validator';

export class CreateRoutesDto {
  @IsInt()
  @IsPositive()
  maxChildrenPerCluster: number;

  @IsInt()
  @IsPositive()
  year: number;
}
