import { Module } from '@nestjs/common';
import { AddressModule } from '../address';
import { ChildController } from './controller';
import { ChildService } from './service';

@Module({
  imports: [AddressModule],
  controllers: [ChildController],
  providers: [ChildService],
  exports: [ChildService],
})
export class ChildModule {}
