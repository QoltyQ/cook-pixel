import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
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

  @Get('name')
  getRecipeByName(@Query('name') name: string): Promise<Recipe[]> {
    return this.recipeService.getRecipeByName(name);
  }

  @Get('category/:id')
  getRecipeByCategoryId(@Param('id') id: string): Promise<Recipe[]> {
    const recipeId = parseInt(id);
    return this.recipeService.getRecipeByCategoryId(recipeId);
  }

  @Get(':id')
  getRecipeById(@Param('id') id: string): Promise<Recipe> {
    const recipeId = parseInt(id);
    return this.recipeService.getRecipeById(recipeId);
  }

  @Put(':id')
  updateRecipe(@Param('id') id: string, recipe: Recipe): Promise<Recipe> {
    const recipeId = parseInt(id);
    return this.recipeService.updateRecipe(recipeId, recipe);
  }

  @Delete(':id')
  deleteRecipe(@Param('id') id: string): Promise<Recipe> {
    const recipeId = parseInt(id);
    return this.recipeService.deleteRecipe(recipeId);
  }
}
