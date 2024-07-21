import { Module } from '@nestjs/common';
import { MapService } from './service';

@Module({
  providers: [MapService],
  exports: [MapService],
})
export class MapModule {}
