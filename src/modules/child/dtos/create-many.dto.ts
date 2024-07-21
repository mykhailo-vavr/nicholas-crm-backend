import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateChildDto } from './create.dto';

// TODO: create custom validator to validate 'less than current year'

export class CreateManyChildrenDto {
  @ApiProperty({ type: [CreateChildDto] })
  @ValidateNested()
  @IsArray()
  @Type(() => CreateChildDto)
  items: CreateChildDto[];
}
