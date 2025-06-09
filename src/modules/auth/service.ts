import { Injectable, NotFoundException } from '@nestjs/common';
import { TokenService } from 'src/common/token';
import { validateHash } from 'src/utils';
import { UserService } from '../user';
import { SignInDto } from './dtos';
import { SignInResponse } from './responses';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async signIn(data: SignInDto): Promise<SignInResponse> {
    const user = await this.userService.getByEmail(data.email);

    if (!user) {
      throw new NotFoundException('Email or password are incorrect');
    }

    const { password, ...userData } = user;

    const validPassword = await validateHash(data.password, password);

    if (!validPassword) {
      throw new NotFoundException('Email or password are incorrect');
    }

    const accessToken = await this.tokenService.generate.access({
      id: user.id,
      roles: userData.roles,
    });

    return { ...userData, accessToken };
  }
}
