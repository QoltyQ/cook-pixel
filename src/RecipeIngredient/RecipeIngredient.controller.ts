import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RecipeIngredient } from '@prisma/client';
import { CreateComponentDto } from './RecipeIngredient.dto';
import { RecipeIngredientService } from './RecipeIngredient.service';

@Controller('api/recipe-ingredient')
export class RecipeIngredientController {
  constructor(
    private readonly recipeIngredientService: RecipeIngredientService,
  ) {}

  @Post()
  async createComponent(
    @Body() componentDto: CreateComponentDto,
  ): Promise<RecipeIngredient> {
    return await this.recipeIngredientService.createComponent(componentDto);
  }

  @Get()
  async getComponents(): Promise<RecipeIngredient[]> {
    return await this.recipeIngredientService.getComponents();
  }

  @Get('ingredient')
  async getComponentByIngredients(
    @Query('ingredientId', new ParseArrayPipe({ items: String }))
    ingredientIds: string[],
  ): Promise<any> {
    const ingredientsId = ingredientIds.map((id) => parseInt(id));
    return await this.recipeIngredientService.getComponentByIngredients(
      ingredientsId,
    );
  }

  @Get(':id')
  async getComponentById(@Param('id') id: string): Promise<RecipeIngredient> {
    const componentId = parseInt(id);

    return await this.recipeIngredientService.getComponentById(componentId);
  }

  @Put(':id')
  async updateComponent(
    @Param('id') id: string,
    @Body() component: RecipeIngredient,
  ): Promise<RecipeIngredient> {
    const componentId = parseInt(id);
    return await this.recipeIngredientService.updateComponent(
      componentId,
      component,
    );
  }

  @Delete(':id')
  async deleteComponent(@Param('id') id: string): Promise<RecipeIngredient> {
    const componentId = parseInt(id);

    return await this.recipeIngredientService.deleteComponent(componentId);
  }
}
