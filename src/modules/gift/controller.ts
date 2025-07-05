import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateGiftDto } from './dtos';
import { GetAllGiftsQuery } from './queries';
import { IsGiftTakenQuery } from './queries/is-taken.query';
import {
  CreateGiftResponse,
  DeleteGiftResponse,
  GetAllGiftsResponse,
  GetGiftByPkResponse,
  IsGiftTakenResponse,
} from './responses';
import { GiftService } from './service';

@ApiBearerAuth()
@ApiTags('Gift')
@Controller('gifts')
export class GiftController {
  constructor(private readonly giftService: GiftService) {}

  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteGiftResponse> {
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
  async getByPk(@Param('id', ParseIntPipe) id: number): Promise<GetGiftByPkResponse> {
    return this.giftService.getByPk(id);
  }

  @ApiUnauthorizedResponse()
  @ApiConflictResponse()
  @Post()
  async create(@Body() dto: CreateGiftDto): Promise<CreateGiftResponse> {
    return this.giftService.create(dto);
  }
}
