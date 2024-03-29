import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  recipeName: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateRecipeDto {
  @IsString()
  preparationSteps?: string;

  @IsString()
  recipeName?: string;

  @IsString()
  description?: string;
}
