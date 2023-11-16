import { PaginatedDto } from 'src/utils';
import { ChildBaseResponse } from './base.response';

export class GetAllChildrenResponse extends PaginatedDto<ChildBaseResponse> {
  items: ChildBaseResponse[];
}
