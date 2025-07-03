import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { SuperJSON } from 'superjson';

@Injectable()
export class SuperJsonInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(map(SuperJSON.serialize));
  }
}
