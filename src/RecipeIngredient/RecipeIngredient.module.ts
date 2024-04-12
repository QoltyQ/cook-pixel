import { Module } from '@nestjs/common';
import { RecipeIngredientController } from './RecipeIngredient.controller';
import { RecipeIngredientService } from './RecipeIngredient.service';
import ComponentRepository from './RecipeIngredient.repository';
import RecipeRepository from 'src/recipes/recipe.repository';
import IngredientRepository from 'src/ingredients/ingredient.repository';

@Module({
  controllers: [RecipeIngredientController],
  providers: [
    RecipeIngredientService,
    RecipeRepository,
    ComponentRepository,
    IngredientRepository,
  ],
})
export class RecipeIngredientModule {}
