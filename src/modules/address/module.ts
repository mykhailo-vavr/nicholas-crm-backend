import { Module } from '@nestjs/common';
import { AddressService } from './service';

@Module({
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
