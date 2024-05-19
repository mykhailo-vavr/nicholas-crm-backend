import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from 'src/decorators';
import { UserTokenData } from 'src/types';
import { UserService } from './service';
import { CreateUserDto, DeactivateUserDto } from './dtos';
import { GetAllUsersQuery, IsUserTakenQuery } from './queries';
import {
  CreateUserResponse,
  DeleteUserResponse,
  GetAllUsersResponse,
  GetUserByPkResponse,
  IsUserTakenResponse,
} from './responses';

@ApiBearerAuth()
@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @Patch(':id/activate')
  async activate(@Param('id') id: number) {
    return this.userService.activate(id);
  }

  @ApiUnauthorizedResponse()
  @ApiConflictResponse()
  @Post()
  async create(@Body() dto: CreateUserDto): Promise<CreateUserResponse> {
    return this.userService.create(dto);
  }

  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @Patch(':id/deactivate')
  async deactivate(@Param('id') id: number, @Body() dto: DeactivateUserDto) {
    return this.userService.deactivate(id, dto);
  }

  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteUserResponse> {
    return this.userService.delete(id);
  }

  @ApiUnauthorizedResponse()
  @Get()
  async getAll(@Query() query: GetAllUsersQuery): Promise<GetAllUsersResponse> {
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
  async getByPk(@Param('id') id: number): Promise<GetUserByPkResponse> {
    return this.userService.getByPk(id);
  }
}
