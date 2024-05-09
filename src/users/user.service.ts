import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import UsersRepository from './user.repository';
import { UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UsersRepository) {}

  registerUser(user: User): Promise<User> {
    return this.userRepository.createUser(user);
  }

  getUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }

  getUserById(id: number): Promise<User> {
    return this.userRepository.getUserById(id);
  }

  updateUserProfile(userId: number, user: UpdateUserDto): Promise<User> {
    return this.userRepository.updateUser(userId, user);
  }
}
