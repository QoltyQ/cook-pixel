import { Injectable } from '@nestjs/common';
import { RecipeIngredient } from '@prisma/client';
import { CreateComponentDto } from './RecipeIngredient.dto';
import ComponentRepository from './RecipeIngredient.repository';

@Injectable()
export class RecipeIngredientService {
  constructor(private readonly componentRepository: ComponentRepository) {}

  createComponent(Component: CreateComponentDto): Promise<RecipeIngredient> {
    return this.componentRepository.createComponent(Component);
  }

  getComponents(): Promise<RecipeIngredient[]> {
    return this.componentRepository.getComponents();
  }

  getComponentById(id: number): Promise<RecipeIngredient> {
    return this.componentRepository.getComponentById(id);
  }

  getComponentByIngredients(array: number[]): Promise<any> {
    return this.componentRepository.getRecipeContainingAllIngredients(array);
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
