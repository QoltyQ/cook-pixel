import { Injectable } from '@nestjs/common';
import IngredientRepository from './ingredient.repository';
import { Ingredient } from '@prisma/client';
import { CreateIngredientDto } from './ingredient.dto';

@Injectable()
export class IngredientService {
  constructor(private readonly ingredientRepository: IngredientRepository) {}

  createIngredient(ingredient: CreateIngredientDto): Promise<Ingredient> {
    return this.ingredientRepository.createIngredient(ingredient);
  }

  getIngredients(): Promise<Ingredient[]> {
    return this.ingredientRepository.getIngredients();
  }

  getIngredientById(id: number): Promise<Ingredient> {
    return this.ingredientRepository.getIngredientById(id);
  }

  updateIngredient(id: number, ingredient: Ingredient): Promise<Ingredient> {
    return this.ingredientRepository.updateIngredient(id, ingredient);
  }

  deleteIngredient(id: number): Promise<Ingredient> {
    return this.ingredientRepository.deleteIngredient(id);
  }
}
