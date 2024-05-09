import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Recipe } from '@prisma/client';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './recipe.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('api/recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  createRecipe(@Body() recipe: CreateRecipeDto): Promise<Recipe> {
    return this.recipeService.createRecipe(recipe);
  }

  @Get()
  getRecipes(): Promise<Recipe[]> {
    return this.recipeService.getRecipes();
  }

  @Get('name')
  getRecipeByName(@Query('name') name: string): Promise<Recipe[]> {
    return this.recipeService.getRecipeByName(name);
  }

  @Get('category/:id')
  getRecipeByCategoryId(@Param('id') id: string): Promise<Recipe[]> {
    const recipeId = parseInt(id);
    return this.recipeService.getRecipeByCategoryId(recipeId);
  }

  @Get(':id')
  getRecipeById(@Param('id') id: string): Promise<Recipe> {
    const recipeId = parseInt(id);
    return this.recipeService.getRecipeById(recipeId);
  }

  @Put(':id')
  updateRecipe(@Param('id') id: string, recipe: Recipe): Promise<Recipe> {
    const recipeId = parseInt(id);
    return this.recipeService.updateRecipe(recipeId, recipe);
  }

  @Delete(':id')
  deleteRecipe(@Param('id') id: string): Promise<Recipe> {
    const recipeId = parseInt(id);
    return this.recipeService.deleteRecipe(recipeId);
  }

  @Post('photo-upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file, @Body() body: any) {
    console.log(file, 'file');
    const filename = file.filename;
    const id = parseInt(body.recipeId);
    return this.recipeService.uploadPhoto(id, filename);
  }
}
