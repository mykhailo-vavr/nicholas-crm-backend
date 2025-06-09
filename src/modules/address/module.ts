import { Module } from '@nestjs/common';
import { GeoModule } from '../geo';
import { AddressService } from './service';

@Module({
  imports: [GeoModule],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
