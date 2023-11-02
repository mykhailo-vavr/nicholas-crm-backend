import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './service';

@Global()
@Module({
  imports: [JwtModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
