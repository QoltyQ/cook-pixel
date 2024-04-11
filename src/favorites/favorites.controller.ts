import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Favorite } from '@prisma/client';
import { CreateFavoriteDto } from './favorites.dto';
import { FavoriteService } from './favorites.service';

@Controller('api/favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  createFavorite(@Body() favorite: CreateFavoriteDto): Promise<Favorite> {
    return this.favoriteService.createFavorite(favorite);
  }

  @Get()
  getFavorites(): Promise<Favorite[]> {
    return this.favoriteService.getFavorites();
  }

  @Get(':id')
  getFavoriteById(@Param('id') id: string): Promise<Favorite> {
    const favoriteId = parseInt(id);
    return this.favoriteService.getFavoriteById(favoriteId);
  }

  @Get('recipe/:recipeId')
  getFavoriteByCategoryId(recipeId: string): Promise<Favorite[]> {
    const favoriteId = parseInt(recipeId);
    return this.favoriteService.getFavoriteByRecipeId(favoriteId);
  }

  @Put(':id')
  updateFavorite(
    @Param('id') id: string,
    Favorite: Favorite,
  ): Promise<Favorite> {
    const favoriteId = parseInt(id);
    return this.favoriteService.updateFavorite(favoriteId, Favorite);
  }

  @Delete(':id')
  deleteFavorite(@Param('id') id: string): Promise<Favorite> {
    const favoriteId = parseInt(id);
    return this.favoriteService.deleteFavorite(favoriteId);
  }
}
