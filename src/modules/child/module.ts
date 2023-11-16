import { Module } from '@nestjs/common';
import { ChildService } from './service';
import { ChildController } from './controller';
import { AddressModule } from '../address';

@Module({
  imports: [AddressModule],
  controllers: [ChildController],
  providers: [ChildService],
})
export class ChildModule {}
