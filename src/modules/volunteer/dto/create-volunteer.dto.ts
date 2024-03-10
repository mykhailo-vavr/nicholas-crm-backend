import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDateString, IsDefined, IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator';
import { CreateUserDto } from 'src/modules/user';

export class CreateVolunteerDto {
  @ApiProperty()
  @IsDateString()
  birthDate: Date;

  @ApiProperty()
  @IsBoolean()
  hasCar: boolean;

  @ApiProperty({ type: CreateUserDto })
  @ValidateNested()
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}
