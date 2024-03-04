import { Injectable, NotFoundException } from '@nestjs/common';
import { validateHash } from 'src/utils';
import { TokenService } from 'src/common/token';
import { UserService } from '../user';
import { SignInResponse } from './responses';
import { SignInDto } from './dtos';

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

    const validPassword = await validateHash(data.password, user.password);

    if (!validPassword) {
      throw new NotFoundException('Email or password are incorrect');
    }

    const accessToken = await this.tokenService.generate.access({
      id: user.id,
      role: user.role,
    });

    return { id: user.id, role: user.role, accessToken };
  }
}
