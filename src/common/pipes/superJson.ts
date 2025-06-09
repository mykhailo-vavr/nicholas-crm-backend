import { Injectable, PipeTransform } from '@nestjs/common';
// import superjson from 'superjson';

@Injectable()
export class SuperJsonPipe implements PipeTransform {
  transform(value: any) {
    // if (value?.json && value?.meta) {
    //   return superjson.deserialize(value);
    // }
    return value;
  }
}
