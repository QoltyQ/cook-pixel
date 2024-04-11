import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ComponentRepository {
  async createComponent(data: any) {
    console.log(data);

    return prisma.recipeIngredient.create({
      data,
    });
  }

  async getComponentById(id: number) {
    return prisma.recipeIngredient.findUnique({
      where: {
        id,
      },
    });
  }

  async getComponents() {
    return prisma.recipeIngredient.findMany();
  }

  async getRecipeContainingAllIngredients(
    ingredientIds: number[],
  ): Promise<any> {
    const recipesWithIngredients = await prisma.recipeIngredient.groupBy({
      by: ['recipeId'],
      where: {
        ingredientId: {
          in: ingredientIds,
        },
      },
    });

    return recipesWithIngredients;
  }

  async updateComponent(id: number, data: any) {
    return prisma.recipeIngredient.update({
      where: {
        id,
      },
      data,
    });
  }

  async createOrUpdateComponent(data: any) {
    return prisma.recipeIngredient.upsert({
      where: {
        id: data.id,
      },
      update: data,
      create: data,
    });
  }

  async deleteComponent(id: number) {
    return prisma.recipeIngredient.delete({
      where: {
        id,
      },
    });
  }
}

export default ComponentRepository;
