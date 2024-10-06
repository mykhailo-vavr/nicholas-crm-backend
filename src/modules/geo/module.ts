import { Module } from '@nestjs/common';
import { GeoService } from './service';

@Module({
  providers: [GeoService],
  exports: [GeoService],
})
export class GeoModule {}
