import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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
  getCategoryById(@Param('id') id: string): Promise<Category> {
    const categoryId = parseInt(id);
    return this.categoryService.getCategoryById(categoryId);
  }

  @Put(':id')
  updateCategory(
    @Param('id') id: string,
    category: Category,
  ): Promise<Category> {
    const categoryId = parseInt(id);
    return this.categoryService.updateCategory(categoryId, category);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string): Promise<Category> {
    const categoryId = parseInt(id);
    return this.categoryService.deleteCategory(categoryId);
  }
}
