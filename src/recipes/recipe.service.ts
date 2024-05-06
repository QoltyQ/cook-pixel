import { Injectable } from '@nestjs/common';
import { Recipe } from '@prisma/client';
import { CreateRecipeDto } from './recipe.dto';
import RecipeRepository from './recipe.repository';
import IngredientRepository from 'src/ingredients/ingredient.repository';
import ComponentRepository from 'src/RecipeIngredient/RecipeIngredient.repository';

@Injectable()
export class RecipeService {
  constructor(
    private readonly recipeRepository: RecipeRepository,
    private readonly componentRepository: ComponentRepository,
    private readonly ingredientRepository: IngredientRepository,
  ) {}

  createRecipe(ingredient: CreateRecipeDto): Promise<Recipe> {
    return this.recipeRepository.createRecipe(ingredient);
  }

  getRecipes(): Promise<Recipe[]> {
    return this.recipeRepository.getRecipes();
  }

  async getRecipeById(id: number): Promise<Recipe> {
    const recipe = await this.recipeRepository.getRecipeById(id);
    const ings = await this.componentRepository.getComponentByRecipeId(id);

    const ingredientsOfRecipe = ings.map(async (ingredient) => {
      const { ingredientId } = ingredient;
      const ingredientData =
        await this.ingredientRepository.getIngredientById(ingredientId);

      return {
        ingredientName: ingredientData.ingredientName,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
      };
    });

    const ingredients = await Promise.all(ingredientsOfRecipe);

    const recip = { ...recipe, ingredients };
    return recip;
  }

  getRecipeByCategoryId(category: number): Promise<Recipe[]> {
    return this.recipeRepository.getRecipeByCategoryId(category);
  }

  async getRecipeByName(name: string): Promise<Recipe[]> {
    const recipesname = await this.recipeRepository.getRecipeByName(name);

    const recipes = recipesname.map(async (oneRecipe: any) => {
      const recipe = await this.recipeRepository.getRecipeById(oneRecipe.id);
      const ings = await this.componentRepository.getComponentByRecipeId(
        oneRecipe.id,
      );

      const ingredientsOfRecipe = ings.map(async (ingredient) => {
        const { ingredientId } = ingredient;
        const ingredientData =
          await this.ingredientRepository.getIngredientById(ingredientId);

        console.log(ingredientData, 'ingredientData');

        return {
          ingredientName: ingredientData.ingredientName,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
        };
      });

      const ingredients = await Promise.all(ingredientsOfRecipe);

      const recip = { ...recipe, ingredients };
      return recip;
    });

    return Promise.all(recipes);
  }

  updateRecipe(id: number, ingredient: Recipe): Promise<Recipe> {
    return this.recipeRepository.updateRecipe(id, ingredient);
  }

  deleteRecipe(id: number): Promise<Recipe> {
    return this.recipeRepository.deleteRecipe(id);
  }
}
