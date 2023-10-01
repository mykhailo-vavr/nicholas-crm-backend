import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AddressService } from './service';
import { CreateAddressDto } from './dto';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(@Body() dto: CreateAddressDto) {
    return this.addressService.create(dto);
  }

  @Get()
  async getAll() {
    return this.addressService.getAll();
  }

  @Get(':id')
  async getByPk(@Param('id') id: number) {
    return this.addressService.getByPk(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.addressService.delete(id);
  }
}
