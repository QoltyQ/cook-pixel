import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateComponentDto {
  @IsString()
  @IsNotEmpty()
  unit: string;

  @IsNumber()
  @IsNotEmpty()
  recipeId: number;

  @IsNumber()
  @IsNotEmpty()
  ingredientId: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty()
  unit: string;

  @IsNumber()
  @IsNotEmpty()
  recipeId: number;

  @IsNumber()
  @IsNotEmpty()
  ingredientId: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
