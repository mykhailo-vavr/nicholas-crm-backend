import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../config';

@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  get generate() {
    return {
      access: (payload: Record<string, any>) =>
        this.jwtService.signAsync(payload, {
          secret: this.configService.get('ACCESS_TOKEN_SECRET'),
          expiresIn: '1h',
        }),
    };
  }

  get verify() {
    return {
      access: <T extends Record<string, any>>(token: string) =>
        this.jwtService.verifyAsync<T>(token, {
          secret: this.configService.get('ACCESS_TOKEN_SECRET'),
        }),
    };
  }
}
