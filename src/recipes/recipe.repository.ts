import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class RecipeRepository {
  async createRecipe(data: any) {
    return prisma.recipe.create({
      data,
    });
  }

  async getRecipeByCategoryId(category: number) {
    return prisma.recipe.findMany({
      where: {
        categoryId: category,
      },
    });
  }

  async getRecipeByName(name: string): Promise<any> {
    return prisma.recipe.findMany({
      where: {
        recipeName: {
          contains: name,
        },
      },
    });
  }

  async getRecipeById(id: number) {
    return prisma.recipe.findUnique({
      where: {
        id,
      },
    });
  }

  async getRecipes() {
    return prisma.recipe.findMany();
  }

  async updateRecipe(id: number, data: any) {
    return prisma.recipe.update({
      where: {
        id,
      },
      data,
    });
  }

  async createOrUpdateRecipe(data: any) {
    return prisma.recipe.upsert({
      where: {
        id: data.id,
      },
      update: data,
      create: data,
    });
  }

  async deleteRecipe(id: number) {
    return prisma.recipe.delete({
      where: {
        id,
      },
    });
  }

  async uploadPhoto(recipeId: number, filename: string) {
    return prisma.recipe.update({
      where: {
        id: recipeId,
      },
      data: {
        photo: filename,
      },
    });
  }
}

export default RecipeRepository;
