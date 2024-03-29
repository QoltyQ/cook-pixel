import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { Category } from '@prisma/client';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './category.dto';

@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  createCategory(@Body() category: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createCategory(category);
  }

  @Get()
  getCategories(): Promise<Category[]> {
    return this.categoryService.getCategories();
  }

  @Get(':id')
  getCategoryById(id: number): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  @Put(':id')
  updateCategory(id: number, category: Category): Promise<Category> {
    return this.categoryService.updateCategory(id, category);
  }

  @Delete(':id')
  deleteCategory(id: number): Promise<Category> {
    return this.categoryService.deleteCategory(id);
  }
}
