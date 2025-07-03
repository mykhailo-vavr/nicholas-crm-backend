import { Controller, Get } from '@nestjs/common';
import { BaseResponse } from 'src/common';
import { Public } from 'src/decorators';
import { AppService } from './service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  async health(): Promise<BaseResponse> {
    return this.appService.health();
  }
}
