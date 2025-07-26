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
import { CreateUserDto, UpdateUserDto } from './dtos';
import { GetAllUsersQuery, IsUserTakenQuery } from './queries';
import { GetAllUsersResponse, GetUserByPkResponse, IsUserTakenResponse } from './responses';
import { UserService } from './service';

@ApiBearerAuth()
@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @Get()
  async getAll(@Query() query: GetAllUsersQuery, @User() user: UserTokenData): Promise<GetAllUsersResponse> {
    if (!hasPermission(user, 'user:read')) {
      throw new ForbiddenException('У вас немає дозволу на перегляд даних користувачів.');
    }

    return this.userService.getAll(query);
  }

  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @Get('is-taken')
  async isTaken(@Query() query: IsUserTakenQuery, @User() user: UserTokenData): Promise<IsUserTakenResponse> {
    if (!hasPermission(user, 'user:read')) {
      throw new ForbiddenException('У вас немає дозволу на перегляд даних користувача.');
    }

    return this.userService.isTaken(query);
  }

  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @Get('me')
  async getMe(@User() user: UserTokenData): Promise<GetUserByPkResponse> {
    return this.userService.getByPk(user.id);
  }

  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @Get(':id')
  async getByPk(@Param('id', ParseIntPipe) id: number, @User() user: UserTokenData): Promise<GetUserByPkResponse> {
    if (!hasPermission(user, 'user:read')) {
      throw new ForbiddenException('У вас немає дозволу на перегляд даних користувача.');
    }

    return this.userService.getByPk(id);
  }

  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
    @User() user: UserTokenData,
  ): Promise<BaseResponse> {
    if (!hasPermission(user, 'user:update')) {
      throw new ForbiddenException('У вас немає дозволу на оновлення даних користувача.');
    }

    return this.userService.update(id, dto);
  }

  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiConflictResponse()
  @Post()
  async create(@Body() dto: CreateUserDto, @User() user: UserTokenData): Promise<BaseResponse> {
    if (!hasPermission(user, 'user:create')) {
      throw new ForbiddenException('У вас немає дозволу на створення користувача.');
    }

    await this.userService.create(dto);

    return { ok: true };
  }
}
