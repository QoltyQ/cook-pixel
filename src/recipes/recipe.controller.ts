import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { Recipe } from '@prisma/client';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './recipe.dto';

@Controller('api/recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  createRecipe(@Body() recipe: CreateRecipeDto): Promise<Recipe> {
    return this.recipeService.createRecipe(recipe);
  }

  @Get()
  getRecipes(): Promise<Recipe[]> {
    return this.recipeService.getRecipes();
  }

  @Get(':id')
  getRecipeById(id: number): Promise<Recipe> {
    return this.recipeService.getRecipeById(id);
  }

  @Put(':id')
  updateRecipe(id: number, recipe: Recipe): Promise<Recipe> {
    return this.recipeService.updateRecipe(id, recipe);
  }

  @Delete(':id')
  deleteRecipe(id: number): Promise<Recipe> {
    return this.recipeService.deleteRecipe(id);
  }
}
