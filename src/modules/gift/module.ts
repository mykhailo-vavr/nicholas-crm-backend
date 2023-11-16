import { Module } from '@nestjs/common';
import { GiftService } from './service';
import { GiftController } from './controller';

@Module({
  providers: [GiftService],
  controllers: [GiftController],
})
export class GiftModule {}
