import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { CreateCategoryDto } from './category.dto';
import CategoryRepository from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  createCategory(category: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.createCategory(category);
  }

  getCategories(): Promise<Category[]> {
    return this.categoryRepository.getCategories();
  }

  getCategoryById(id: number): Promise<Category> {
    return this.categoryRepository.getCategoryById(id);
  }

  updateCategory(id: number, category: Category): Promise<Category> {
    return this.categoryRepository.updateCategory(id, category);
  }

  deleteCategory(id: number): Promise<Category> {
    return this.categoryRepository.deleteCategory(id);
  }
}
