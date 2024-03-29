import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  categoryName: string;
}

export class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty()
  categoryName: string;
}
