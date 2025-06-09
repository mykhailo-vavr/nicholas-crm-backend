import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AddressModule } from '../address';
import { ChildModule } from '../child';
import { VolunteerModule } from '../volunteer';
import { RouteController } from './controller';
import { RouteService } from './service';

@Module({
  imports: [AddressModule, ChildModule, HttpModule, VolunteerModule],
  controllers: [RouteController],
  providers: [RouteService],
})
export class RouteModule {}
