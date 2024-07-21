import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RouteService } from './service';
import { RouteController } from './controller';
import { ChildModule } from '../child';
import { AddressModule } from '../address';
import { VolunteerModule } from '../volunteer';

@Module({
  imports: [AddressModule, ChildModule, HttpModule, VolunteerModule],
  controllers: [RouteController],
  providers: [RouteService],
})
export class RouteModule {}
