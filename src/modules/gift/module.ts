import { Module } from '@nestjs/common';
import { GiftController } from './controller';
import { GiftService } from './service';

@Module({
  providers: [GiftService],
  controllers: [GiftController],
})
export class GiftModule {}
