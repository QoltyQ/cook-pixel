import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  public async getUserById(id: number) {
    return this.userService.getUserById(id);
  }
}
