import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFavoriteDto {
  @IsNumber()
  @IsNotEmpty()
  recipeId: number;
}
