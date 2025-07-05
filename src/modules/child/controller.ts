import { Body, Controller, ForbiddenException, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BaseResponse } from 'src/common';
import { User } from 'src/decorators';
import { hasPermission } from 'src/permissions';
import { UserTokenData } from 'src/types';
import { CreateChildDto, CreateManyChildrenDto } from './dtos';
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

  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @Post()
  async create(@Body() dto: CreateChildDto, @User() user: UserTokenData): Promise<BaseResponse> {
    if (!hasPermission(user, 'child:create')) {
      throw new ForbiddenException('У вас немає дозволу на додавання даних дитини.');
    }

    return this.childService.create(dto);
  }

  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @Post('many')
  async createMany(@Body() dto: CreateManyChildrenDto, @User() user: UserTokenData): Promise<BaseResponse> {
    if (!hasPermission(user, 'child:create')) {
      throw new ForbiddenException('У вас немає дозволу на додавання даних дітей.');
    }

    return this.childService.createMany(dto);
  }
}
