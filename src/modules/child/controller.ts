import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChildService } from './service';
import { CreateChildDto, UpdateChildDto } from './dto';

@Controller('children')
export class ChildController {
  constructor(private readonly childService: ChildService) {}

  @Post()
  async create(@Body() dto: CreateChildDto) {
    return this.childService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.childService.delete(id);
  }

  @Get()
  async getAll() {
    return this.childService.getAll();
  }

  @Get(':id')
  async getByPk(@Param('id') id: number) {
    return this.childService.getByPk(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateChildDto: UpdateChildDto,
  ) {
    return this.childService.update(id, updateChildDto);
  }
}
