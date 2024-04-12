import { Injectable } from '@nestjs/common';
import { RecipeIngredient } from '@prisma/client';
import { CreateComponentDto } from './RecipeIngredient.dto';
import ComponentRepository from './RecipeIngredient.repository';
import RecipeRepository from 'src/recipes/recipe.repository';
import IngredientRepository from 'src/ingredients/ingredient.repository';

@Injectable()
export class RecipeIngredientService {
  constructor(
    private readonly componentRepository: ComponentRepository,
    private readonly recipeRepository: RecipeRepository,
    private readonly ingredientRepository: IngredientRepository,
  ) {}

  createComponent(Component: CreateComponentDto): Promise<RecipeIngredient> {
    return this.componentRepository.createComponent(Component);
  }

  getComponents(): Promise<RecipeIngredient[]> {
    return this.componentRepository.getComponents();
  }

  getComponentById(id: number): Promise<RecipeIngredient> {
    return this.componentRepository.getComponentById(id);
  }

  getComponentByRecipeId(id: number): Promise<RecipeIngredient[]> {
    return this.componentRepository.getComponentByRecipeId(id);
  }

  async getComponentByIngredients(array: number[]): Promise<any> {
    const recipeIdsWithIngredients =
      await this.componentRepository.getRecipeContainingAllIngredients(array);

    const recipeIds = recipeIdsWithIngredients.map(
      (recipe: any) => recipe.recipeId,
    );

    const recipes = recipeIds.map(async (id: number) => {
      const recipe = await this.recipeRepository.getRecipeById(id);
      const ings = await this.componentRepository.getComponentByRecipeId(id);

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

  updateComponent(
    id: number,
    Component: RecipeIngredient,
  ): Promise<RecipeIngredient> {
    return this.componentRepository.updateComponent(id, Component);
  }

  deleteComponent(id: number): Promise<RecipeIngredient> {
    return this.componentRepository.deleteComponent(id);
  }
}
