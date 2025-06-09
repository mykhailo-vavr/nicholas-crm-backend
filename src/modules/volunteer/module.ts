import { Module } from '@nestjs/common';
import { UserModule } from '../user';
import { VolunteerController } from './controller';
import { VolunteerService } from './service';

@Module({
  imports: [UserModule],
  controllers: [VolunteerController],
  providers: [VolunteerService],
  exports: [VolunteerService],
})
export class VolunteerModule {}
