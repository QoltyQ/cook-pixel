import { Module } from '@nestjs/common';
import { IngredientController } from './ingredient.controller';
import IngredientRepository from './ingredient.repository';
import { IngredientService } from './ingredient.service';

@Module({
  controllers: [IngredientController],
  providers: [IngredientService, IngredientRepository],
})
export class IngredientModule {}
