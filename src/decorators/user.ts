import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserTokenData } from 'src/types';

export const User = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as UserTokenData;
});
