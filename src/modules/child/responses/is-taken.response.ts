import { ApiPropertyOptional } from '@nestjs/swagger';
import { ChildBaseResponse } from './base.response';

export class IsChildTakenResponse {
  isTaken: boolean;

  @ApiPropertyOptional({ type: ChildBaseResponse })
  child?: ChildBaseResponse;
}
