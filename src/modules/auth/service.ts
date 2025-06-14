import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common';
import { TokenService } from 'src/common/token';
import { validateHash } from 'src/utils';
import { SignInDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
  ) {}

  async signIn(data: SignInDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        password: true,
        roles: true,
        isActive: true,
        deactivationReason: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Неправильна електронна адреса або пароль.');
    }

    const { password, ...userData } = user;

    const isPasswordValid = await validateHash(data.password, password);

    if (!isPasswordValid) {
      throw new NotFoundException('Неправильна електронна адреса або пароль.');
    }

    const accessToken = await this.tokenService.generate.access({
      id: user.id,
      roles: userData.roles,
    });

    return { ...userData, accessToken };
  }
}
