import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/users/user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('/send-code')
  // public async create(@Body() createUserDto: CreateUserDto) {
  //   return this.authService.sendCode(createUserDto);
  // }

  // @Post('/forgot-password')
  // public async sendCodeOnForgotPassword(@Body() login: string) {
  //   return this.authService.sendCodeOnForgotPassword(login);
  // }

  // @Post('/verify-code')
  // public async verifyCode(@Body() verifyUserDto: VerifyUserDto) {
  //   return this.authService.verifyCode(verifyUserDto);
  // }

  @Post('/login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const loggedUser = await this.authService.login(loginUserDto);
      return loggedUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/refresh-token')
  public async refreshToken(@Body() token: string) {
    return this.authService.refreshToken(token);
  }

  @Post('/register')
  public async register(@Body() createUserDto: CreateUserDto) {
    try {
      const createdUser = await this.authService.register(createUserDto);
      return createdUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
