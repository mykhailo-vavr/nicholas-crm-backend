import { Injectable, PipeTransform } from '@nestjs/common';
import { SuperJSON } from 'superjson';

@Injectable()
export class SuperJsonPipe implements PipeTransform {
  transform(value: any) {
    return value?.json && value?.meta ? SuperJSON.deserialize(value) : value;
  }
}
