import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async health() {
    return { ok: true };
  }
}
