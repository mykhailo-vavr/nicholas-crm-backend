import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateRoutesDto } from './dto/create.dto';
import { GetRouteConfigByYearResponse } from './responses/get-config-by-year.response';
import { GetRoutesConfigResponse } from './responses/get-configs.response';
import { RouteService } from './service';

@ApiBearerAuth()
@ApiTags('Route')
@Controller('route')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @ApiUnauthorizedResponse()
  @Get('config')
  async getConfigs(): Promise<GetRoutesConfigResponse> {
    return this.routeService.getConfigs();
  }

  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @Get('config/:year')
  async getConfigByYear(@Param('year', ParseIntPipe) year: number): Promise<GetRouteConfigByYearResponse> {
    return this.routeService.getConfigByYear(year);
  }

  @ApiUnauthorizedResponse()
  @Post()
  async create(@Body() dto: CreateRoutesDto): Promise<void> {
    return this.routeService.create(dto);
  }
}
