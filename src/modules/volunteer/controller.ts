import { Controller, Get, Param, Delete, Post, Body } from '@nestjs/common';
import { Public } from 'src/decorators';
import { ApiConflictResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { VolunteerService } from './service';
import { CreateVolunteerDto } from './dto';

@ApiTags('Volunteer')
@Controller('volunteer')
export class VolunteerController {
  constructor(private readonly volunteerService: VolunteerService) {}

  @ApiCreatedResponse()
  @ApiConflictResponse()
  @Public()
  @Post()
  async create(@Body() dto: CreateVolunteerDto) {
    return this.volunteerService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.volunteerService.delete(id);
  }

  @Get()
  async getAll() {
    return this.volunteerService.getAll();
  }

  @Get(':id')
  async getByPk(@Param('id') id: number) {
    return this.volunteerService.getByPk(id);
  }
}
