import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class FavoriteRepository {
  async createFavorite(userId: number, data: any) {
    return prisma.favorite.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async getFavoriteById(id: number) {
    return prisma.favorite.findUnique({
      where: {
        id,
      },
    });
  }

  async getFavoriteByUserId(id: number) {
    return prisma.favorite.findMany({
      where: {
        userId: id,
      },
    });
  }

  async getFavorites() {
    return prisma.favorite.findMany();
  }

  async updateFavorite(id: number, data: any) {
    return prisma.favorite.update({
      where: {
        id,
      },
      data,
    });
  }

  async createOrUpdateFavorite(data: any) {
    return prisma.favorite.upsert({
      where: {
        id: data.id,
      },
      update: data,
      create: data,
    });
  }

  async deleteFavorite(id: number) {
    return prisma.favorite.delete({
      where: {
        id,
      },
    });
  }
}

export default FavoriteRepository;
