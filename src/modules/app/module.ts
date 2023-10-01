import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { validateEnvironmentVariables } from 'src/utils';
import { AuthGuard, RolesGuard } from 'src/guards';
import { AppController } from './controller';
import { AppService } from './service';
import { AuthModule } from '../auth';
import { PrismaModule, TokenModule } from '../../common';
import { UserModule } from '../user';
import { AddressModule } from '../address';
import { ChildModule } from '../child';
import { VolunteerModule } from '../volunteer';

@Module({
  imports: [
    AddressModule,
    AuthModule,
    ChildModule,
    UserModule,
    VolunteerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnvironmentVariables,
    }),
    PrismaModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: AuthGuard },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
