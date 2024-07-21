import { Module } from '@nestjs/common';
import { AddressService } from './service';
import { MapModule } from '../map';

@Module({
  imports: [MapModule],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
