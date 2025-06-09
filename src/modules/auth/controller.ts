import { Body, Controller, Post } from '@nestjs/common';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators';
import { SignInDto } from './dtos';
import { SignInResponse } from './responses';
import { AuthService } from './service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiNotFoundResponse()
  @Public()
  @Post('sign-in')
  async signIn(@Body() dto: SignInDto): Promise<SignInResponse> {
    return this.authService.signIn(dto);
  }
}
