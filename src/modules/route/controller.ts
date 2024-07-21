import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RouteService } from './service';
import { GetRouteConfigByYearResponse } from './responses/get-config-by-year.response';
import { GetRoutesConfigResponse } from './responses/get-configs.response';
import { CreateRoutesDto } from './dto/create.dto';

@ApiBearerAuth()
@ApiTags('Route')
@Controller('route')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @ApiUnauthorizedResponse()
  @Post()
  async create(@Body() dto: CreateRoutesDto): Promise<void> {
    return this.routeService.create(dto);
  }

  @ApiUnauthorizedResponse()
  @Get('config')
  async getConfigs(): Promise<GetRoutesConfigResponse> {
    return this.routeService.getConfigs();
  }

  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @Get('config/:year')
  async getConfigByYear(@Param() year: number): Promise<GetRouteConfigByYearResponse> {
    return this.routeService.getConfigByYear(year);
  }
}
