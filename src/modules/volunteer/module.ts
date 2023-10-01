import { Module } from '@nestjs/common';
import { VolunteerService } from './service';
import { VolunteerController } from './controller';
import { UserModule } from '../user';

@Module({
  imports: [UserModule],
  controllers: [VolunteerController],
  providers: [VolunteerService],
})
export class VolunteerModule {}
