import { Module } from '@nestjs/common';
import { UserModule } from '../user';
import { AuthController } from './controller';
import { AuthService } from './service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
