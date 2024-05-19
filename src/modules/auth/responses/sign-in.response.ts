import { UserBaseResponse } from 'src/modules/user/responses';

export class SignInResponse extends UserBaseResponse {
  accessToken: string;
}
