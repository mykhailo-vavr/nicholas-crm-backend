import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateChildDto, DeactivateChildDto, IsChildTakenDto } from './dtos';
import { CreateManyChildrenDto } from './dtos/create-many.dto';
import { GetAllChildrenQuery } from './queries';
import { CreateChildResponse, DeleteChildResponse, GetAllChildrenResponse, GetChildByPkResponse } from './responses';
import { IsChildTakenResponse } from './responses/is-taken.response';
import { ChildService } from './service';

@ApiBearerAuth()
@ApiTags('Child')
@Controller('children')
export class ChildController {
  constructor(private readonly childService: ChildService) {}

  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @Patch(':id/activate')
  async activate(@Param('id') id: number) {
    return this.childService.activate(id);
  }

  @ApiUnauthorizedResponse()
  @Post()
  async create(@Body() dto: CreateChildDto): Promise<CreateChildResponse> {
    return this.childService.create(dto);
  }

  @ApiUnauthorizedResponse()
  @Post('many')
  async createMany(@Body() dto: CreateManyChildrenDto): Promise<void> {
    return this.childService.createMany(dto);
  }

  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @Patch(':id/deactivate')
  async deactivate(@Param('id') id: number, @Body() dto: DeactivateChildDto) {
    return this.childService.deactivate(id, dto);
  }

  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteChildResponse> {
    return this.childService.delete(id);
  }

  @ApiUnauthorizedResponse()
  @Get()
  async getAll(@Query() query: GetAllChildrenQuery): Promise<GetAllChildrenResponse> {
    return this.childService.getAll(query);
  }

  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @Get(':id')
  async getByPk(@Param('id') id: number): Promise<GetChildByPkResponse> {
    return this.childService.getByPk(id);
  }

  @ApiUnauthorizedResponse()
  @Post('is-taken')
  async isTaken(@Body() query: IsChildTakenDto): Promise<IsChildTakenResponse> {
    return this.childService.isTaken(query);
  }
}
