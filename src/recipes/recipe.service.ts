import { Injectable } from '@nestjs/common';
import { Recipe } from '@prisma/client';
import { CreateRecipeDto } from './recipe.dto';
import RecipeRepository from './recipe.repository';

@Injectable()
export class RecipeService {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  createRecipe(ingredient: CreateRecipeDto): Promise<Recipe> {
    return this.recipeRepository.createRecipe(ingredient);
  }

  getRecipes(): Promise<Recipe[]> {
    return this.recipeRepository.getRecipes();
  }

  getRecipeById(id: number): Promise<Recipe> {
    return this.recipeRepository.getRecipeById(id);
  }

  getRecipeByCategoryId(category: number): Promise<Recipe[]> {
    return this.recipeRepository.getRecipeByCategoryId(category);
  }

  updateRecipe(id: number, ingredient: Recipe): Promise<Recipe> {
    return this.recipeRepository.updateRecipe(id, ingredient);
  }

  deleteRecipe(id: number): Promise<Recipe> {
    return this.recipeRepository.deleteRecipe(id);
  }
}
