import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserRepository {
  async createUser(data: any) {
    return prisma.user.create({
      data,
    });
  }

  async getUserById(id: number) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getUsers() {
    return prisma.user.findMany();
  }

  async getUserByLogin(login: string) {
    return prisma.user.findUnique({
      where: {
        login,
      },
    });
  }

  async updateUser(id: number, data: any) {
    return prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async createOrUpdateUser(data: any) {
    return prisma.user.upsert({
      where: {
        id: data.id,
      },
      update: data,
      create: data,
    });
  }

  async deleteUser(id: number) {
    return prisma.user.delete({
      where: {
        id,
      },
    });
  }
}

export default UserRepository;
