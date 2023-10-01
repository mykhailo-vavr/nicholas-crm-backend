import { Module } from '@nestjs/common';
import { ChildService } from './service';
import { ChildController } from './controller';

@Module({
  controllers: [ChildController],
  providers: [ChildService],
})
export class ChildModule {}
