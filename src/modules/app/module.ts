import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, RolesGuard } from 'src/guards';
import { validateEnvironmentVariables } from 'src/utils';
import { PrismaModule, TokenModule } from '../../common';
import { AddressModule } from '../address';
import { AuthModule } from '../auth';
import { ChildModule } from '../child';
import { GiftModule } from '../gift';
import { RouteModule } from '../route';
import { UserModule } from '../user';
import { VolunteerModule } from '../volunteer';
import { AppController } from './controller';
import { AppService } from './service';

@Module({
  imports: [
    AddressModule,
    AuthModule,
    ChildModule,
    GiftModule,
    RouteModule,
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
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
