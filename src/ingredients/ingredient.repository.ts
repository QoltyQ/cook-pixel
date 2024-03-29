import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class IngredientRepository {
  async createIngredient(data: any) {
    console.log(data);

    return prisma.ingredient.create({
      data,
    });
  }

  async getIngredientById(id: number) {
    return prisma.ingredient.findUnique({
      where: {
        id,
      },
    });
  }

  async getIngredients() {
    return prisma.ingredient.findMany();
  }

  async updateIngredient(id: number, data: any) {
    return prisma.ingredient.update({
      where: {
        id,
      },
      data,
    });
  }

  async createOrUpdateIngredient(data: any) {
    return prisma.ingredient.upsert({
      where: {
        id: data.id,
      },
      update: data,
      create: data,
    });
  }

  async deleteIngredient(id: number) {
    return prisma.ingredient.delete({
      where: {
        id,
      },
    });
  }
}

export default IngredientRepository;
