import { Module } from '@nestjs/common';
import { RecipeIngredientController } from './RecipeIngredient.controller';
import { RecipeIngredientService } from './RecipeIngredient.service';
import ComponentRepository from './RecipeIngredient.repository';

@Module({
  controllers: [RecipeIngredientController],
  providers: [RecipeIngredientService, ComponentRepository],
})
export class RecipeIngredientModule {}
