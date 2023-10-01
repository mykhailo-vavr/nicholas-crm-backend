import { PaginatedDto } from 'src/utils';
import { UserBaseResponse } from './base.response';

export class GetAllUsersResponse extends PaginatedDto<UserBaseResponse> {
  items: UserBaseResponse[];
}
