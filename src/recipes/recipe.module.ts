import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import RecipeRepository from './recipe.repository';
import { RecipeService } from './recipe.service';
import ComponentRepository from 'src/RecipeIngredient/RecipeIngredient.repository';
import IngredientRepository from 'src/ingredients/ingredient.repository';

@Module({
  controllers: [RecipeController],
  providers: [
    RecipeService,
    RecipeRepository,
    ComponentRepository,
    IngredientRepository,
  ],
})
export class RecipeModule {}
