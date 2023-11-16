import { PaginatedDto } from 'src/utils';
import { GiftBaseResponse } from './base.response';

export class GetAllGiftsResponse extends PaginatedDto<GiftBaseResponse> {
  items: GiftBaseResponse[];
}
