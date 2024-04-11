import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class FavoriteRepository {
  async createFavorite(data: any) {
    console.log(data);

    return prisma.favorite.create({
      data,
    });
  }

  async getFavoriteById(id: number) {
    return prisma.favorite.findUnique({
      where: {
        id,
      },
    });
  }

  async getFavoriteByRecipeId(recipe: number) {
    return prisma.favorite.findMany({
      where: {
        recipeId: recipe,
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
