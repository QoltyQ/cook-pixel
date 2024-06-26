import {
  Controller,
  Get,
  Req,
  UseGuards,
  UnauthorizedException,
  Param,
  Put,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/jwt/jwt.guard';
import { UpdateUserDto } from './user.dto';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  public async getUserProfile(@Req() req: any) {
    if (!req.user || !req.user.user) {
      throw new UnauthorizedException('User profile not found');
    }
    const userProfile = req.user.user;
    return userProfile;
  }

  @UseGuards(AuthGuard)
  @Put('profile')
  public async updateUserProfile(@Req() req: any, @Body() user: UpdateUserDto) {
    if (!req.user || !req.user.user) {
      throw new UnauthorizedException('User profile not found');
    }
    const userProfile = req.user.user.id;
    return this.userService.updateUserProfile(userProfile, user);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<any> {
    const userId = parseInt(id);
    const user = await this.userService.getUserById(userId);
    return user;
  }
}
