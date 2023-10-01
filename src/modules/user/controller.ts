import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserService } from './service';
import { CreateUserDto } from './dtos';
import { GetAllUsersQuery, IsUserTakenQuery } from './queries';
import {
  CreateUserResponse,
  DeleteUserResponse,
  GetAllUsersResponse,
  GetUserByPkResponse,
  IsUserTakenResponse,
} from './responses';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiUnauthorizedResponse()
  @ApiConflictResponse()
  @Post()
  async create(@Body() dto: CreateUserDto): Promise<CreateUserResponse> {
    return this.userService.create(dto);
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
