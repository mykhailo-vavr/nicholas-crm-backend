import { Body, Controller, ForbiddenException, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from 'src/decorators';
import { UserTokenData } from 'src/types';
import { UserService } from './service';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { GetAllUsersQuery, IsUserTakenQuery } from './queries';
import { GetAllUsersResponse, GetUserByPkResponse, IsUserTakenResponse } from './responses';
import { BaseResponse } from 'src/common';
import { hasPermission } from 'src/permissions';

@ApiBearerAuth()
@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiConflictResponse()
  @Post()
  async create(@Body() dto: CreateUserDto, @User() user: UserTokenData): Promise<BaseResponse> {
    if (!hasPermission(user.roles, 'user:create')) {
      throw new ForbiddenException('У вас немає дозволу на створення користувача.');
    }

    await this.userService.create(dto);

    return { ok: true };
  }

  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @Get()
  async getAll(@Query() query: GetAllUsersQuery, @User() user: UserTokenData): Promise<GetAllUsersResponse> {
    if (!hasPermission(user.roles, 'user:read')) {
      throw new ForbiddenException('У вас немає дозволу на читання даних користувачів.');
    }

    return this.userService.getAll(query);
  }

  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @Get('me')
  async getMe(@User() user: UserTokenData) {
    return this.userService.getByPk(user.id);
  }

  @ApiUnauthorizedResponse()
  @Get('is-taken')
  async isTaken(@Query() query: IsUserTakenQuery): Promise<IsUserTakenResponse> {
    return this.userService.isTaken(query);
  }

  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @Get(':id')
  async getByPk(@Param('id', ParseIntPipe) id: number): Promise<GetUserByPkResponse> {
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
    if (!hasPermission(user.roles, 'user:update')) {
      throw new ForbiddenException('У вас немає дозволу на оновлення даних користувача.');
    }

    return this.userService.update(id, dto);
  }
}
