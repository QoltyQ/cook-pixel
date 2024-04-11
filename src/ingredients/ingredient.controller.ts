import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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
  getIngredientById(@Param('id') id: string): Promise<Ingredient> {
    const ingredientId = parseInt(id);
    return this.ingredientService.getIngredientById(ingredientId);
  }

  @Put(':id')
  updateIngredient(
    @Param('id') id: string,
    ingredient: Ingredient,
  ): Promise<Ingredient> {
    const ingredientId = parseInt(id);
    return this.ingredientService.updateIngredient(ingredientId, ingredient);
  }

  @Delete(':id')
  deleteIngredient(@Param('id') id: string): Promise<Ingredient> {
    const ingredientId = parseInt(id);
    return this.ingredientService.deleteIngredient(ingredientId);
  }
}
