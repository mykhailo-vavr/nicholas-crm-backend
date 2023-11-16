import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GiftService } from './service';
import { CreateGiftDto } from './dtos';
import { GetAllGiftsQuery } from './queries';
import {
  CreateGiftResponse,
  DeleteGiftResponse,
  GetAllGiftsResponse,
  GetGiftByPkResponse,
  IsGiftTakenResponse,
} from './responses';
import { IsGiftTakenQuery } from './queries/is-taken.query';

@ApiBearerAuth()
@ApiTags('Gift')
@Controller('gifts')
export class GiftController {
  constructor(private readonly giftService: GiftService) {}

  @ApiUnauthorizedResponse()
  @ApiConflictResponse()
  @Post()
  async create(@Body() dto: CreateGiftDto): Promise<CreateGiftResponse> {
    return this.giftService.create(dto);
  }

  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteGiftResponse> {
    return this.giftService.delete(id);
  }

  @ApiUnauthorizedResponse()
  @Get()
  async getAll(@Query() query: GetAllGiftsQuery): Promise<GetAllGiftsResponse> {
    return this.giftService.getAll(query);
  }

  @ApiUnauthorizedResponse()
  @Get('is-taken')
  async isTaken(@Query() query: IsGiftTakenQuery): Promise<IsGiftTakenResponse> {
    return this.giftService.isTaken(query);
  }

  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @Get(':id')
  async getByPk(@Param('id') id: number): Promise<GetGiftByPkResponse> {
    return this.giftService.getByPk(id);
  }
}
