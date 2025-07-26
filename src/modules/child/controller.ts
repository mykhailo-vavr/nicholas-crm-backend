import { Body, Controller, ForbiddenException, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BaseResponse } from 'src/common';
import { User } from 'src/decorators';
import { hasPermission } from 'src/permissions';
import { UserTokenData } from 'src/types';
import { CreateChildDto, CreateManyChildrenDto, UpdateChildDto } from './dtos';
import { GetAllChildrenQuery, IsChildTakenQuery } from './queries';
import { GetAllChildrenResponse, GetChildByPkResponse, IsChildTakenResponse } from './responses';
import { ChildService } from './service';

@ApiBearerAuth()
@ApiTags('Child')
@Controller('children')
export class ChildController {
  constructor(private readonly childService: ChildService) {}

  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @Get()
  async getAll(@Query() query: GetAllChildrenQuery, @User() user: UserTokenData): Promise<GetAllChildrenResponse> {
    if (!hasPermission(user, 'child:read')) {
      throw new ForbiddenException('У вас немає дозволу на перегляд даних дітей.');
    }

    return this.childService.getAll(query);
  }

  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @Get('is-taken')
  async isTaken(@Query() query: IsChildTakenQuery, @User() user: UserTokenData): Promise<IsChildTakenResponse> {
    if (!hasPermission(user, 'child:read')) {
      throw new ForbiddenException('У вас немає дозволу на перегляд даних дитини.');
    }

    return this.childService.isTaken(query);
  }

  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @Get(':id')
  async getByPk(@Param('id', ParseIntPipe) id: number, @User() user: UserTokenData): Promise<GetChildByPkResponse> {
    if (!hasPermission(user, 'child:read')) {
      throw new ForbiddenException('У вас немає дозволу на перегляд даних дитини.');
    }

    return this.childService.getByPk(id);
  }

  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateChildDto,
    @User() user: UserTokenData,
  ): Promise<BaseResponse> {
    if (!hasPermission(user, 'child:update')) {
      throw new ForbiddenException('У вас немає дозволу на оновлення даних дитини.');
    }

    return this.childService.update(id, dto);
  }

  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiConflictResponse()
  @Post()
  async create(@Body() dto: CreateChildDto, @User() user: UserTokenData): Promise<BaseResponse> {
    if (!hasPermission(user, 'child:create')) {
      throw new ForbiddenException('У вас немає дозволу на додавання даних дитини.');
    }

    return this.childService.create(dto);
  }

  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiConflictResponse()
  @Post('many')
  async createMany(@Body() dto: CreateManyChildrenDto, @User() user: UserTokenData): Promise<BaseResponse> {
    if (!hasPermission(user, 'child:create')) {
      throw new ForbiddenException('У вас немає дозволу на додавання даних дітей.');
    }

    return this.childService.createMany(dto);
  }
}
