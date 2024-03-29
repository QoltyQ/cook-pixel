import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { Ingredient } from '@prisma/client';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './ingredient.dto';

@Controller('api/ingredients')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  createIngredient(
    @Body() ingredient: CreateIngredientDto,
  ): Promise<Ingredient> {
    return this.ingredientService.createIngredient(ingredient);
  }

  @Get()
  getIngredients(): Promise<Ingredient[]> {
    return this.ingredientService.getIngredients();
  }

  @Get(':id')
  getIngredientById(id: number): Promise<Ingredient> {
    return this.ingredientService.getIngredientById(id);
  }

  @Put(':id')
  updateIngredient(id: number, ingredient: Ingredient): Promise<Ingredient> {
    return this.ingredientService.updateIngredient(id, ingredient);
  }

  @Delete(':id')
  deleteIngredient(id: number): Promise<Ingredient> {
    return this.ingredientService.deleteIngredient(id);
  }
}
