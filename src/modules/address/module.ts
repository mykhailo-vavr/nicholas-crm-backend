import { Module } from '@nestjs/common';
import { AddressService } from './service';
import { GeoModule } from '../geo';

@Module({
  imports: [GeoModule],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
