import { ApiProperty } from '@nestjs/swagger';
import { GetRouteConfigByYearResponse } from './get-config-by-year.response';

export class GetRoutesConfigResponse {
  @ApiProperty({ type: [GetRouteConfigByYearResponse] })
  items: GetRouteConfigByYearResponse[];
}
