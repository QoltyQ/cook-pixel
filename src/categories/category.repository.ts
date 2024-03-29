import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class CategoryRepository {
  async createCategory(data: any) {
    console.log(data);

    return prisma.category.create({
      data,
    });
  }

  async getCategoryById(id: number) {
    return prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  async getCategories() {
    return prisma.category.findMany();
  }

  async updateCategory(id: number, data: any) {
    return prisma.category.update({
      where: {
        id,
      },
      data,
    });
  }

  async createOrUpdateCategory(data: any) {
    return prisma.category.upsert({
      where: {
        id: data.id,
      },
      update: data,
      create: data,
    });
  }

  async deleteCategory(id: number) {
    return prisma.category.delete({
      where: {
        id,
      },
    });
  }
}

export default CategoryRepository;
