import { Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, VerifyUserDto } from 'src/users/user.dto';
import UserRepository from 'src/users/user.repository';
import { sendEmail, sendEmailPassword } from 'src/utils/nodemailer';
import { generateOTP } from 'src/utils/otp';
import { generatePassword } from 'src/utils/passwordGenerator';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async sendCode(userAuth: CreateUserDto) {
    try {
      const code = generateOTP();
      await sendEmail(userAuth, code);
      const user = await this.userRepository.createUser({
        ...userAuth,
        otp: code,
        role: 'user',
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async sendCodeOnForgotPassword(login: string) {
    try {
      const user = await this.userRepository.getUserByLogin(login);

      const code = generateOTP();
      await sendEmail(user, code);
      const updatedUser = await this.userRepository.updateUser(user.id, {
        otp: code,
      });
      return updatedUser;
    } catch (error) {
      console.log(error);
    }
  }

  async verifyCode(credentials: VerifyUserDto) {
    try {
      const user = await this.userRepository.getUserByLogin(credentials.login);
      if (user.otp === credentials.otp) {
        const password = generatePassword(16);
        await sendEmailPassword(user, password);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await this.userRepository.updateUser(user.id, {
          otp: null,
          password: hashedPassword,
        });

        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async login(credentials: LoginUserDto) {
    try {
      const user = await this.userRepository.getUserByLogin(credentials.login);
      if (user) {
        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (isMatch) {
          const token = await this.generateAccessToken(user);
          const refreshToken = await this.generateRefreshToken(user);
          return { user, token, refreshToken };
        }
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async generateAccessToken(user: any) {
    const token = jwt.sign({ user }, 'secret-key', { expiresIn: '1h' });
    return token;
  }

  async generateRefreshToken(user: any) {
    const token = jwt.sign({ user }, 'refresh-secret-key', { expiresIn: '1m' });
    return token;
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, 'refresh-secret-key');

      const user = decoded.user;

      const accessToken = this.generateAccessToken(user);

      return accessToken;
    } catch (error) {
      console.log(error);
    }
  }
}
