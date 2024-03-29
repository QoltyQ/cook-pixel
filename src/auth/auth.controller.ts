import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto, VerifyUserDto } from 'src/users/user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/send-code')
  public async create(@Body() createUserDto: CreateUserDto) {
    return this.authService.sendCode(createUserDto);
  }

  @Post('/forgot-password')
  public async sendCodeOnForgotPassword(@Body() login: string) {
    return this.authService.sendCodeOnForgotPassword(login);
  }

  @Post('/verify-code')
  public async verifyCode(@Body() verifyUserDto: VerifyUserDto) {
    return this.authService.verifyCode(verifyUserDto);
  }

  @Post('/login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('/refresh-token')
  public async refreshToken(@Body() token: string) {
    return this.authService.refreshToken(token);
  }
}
