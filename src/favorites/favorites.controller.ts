import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Favorite } from '@prisma/client';
import { CreateFavoriteDto } from './favorites.dto';
import { FavoriteService } from './favorites.service';
import { AuthGuard } from 'src/jwt/jwt.guard';

@Controller('api/favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @UseGuards(AuthGuard)
  @Post()
  createFavorite(
    @Req() req: any,
    @Body() favorite: CreateFavoriteDto,
  ): Promise<Favorite> {
    if (!req.user || !req.user.user) {
      throw new UnauthorizedException('User not found');
    }
    const userId = req.user.user.id;
    return this.favoriteService.createFavorite(userId, favorite);
  }

  @Get()
  getFavorites(): Promise<Favorite[]> {
    return this.favoriteService.getFavorites();
  }

  @UseGuards(AuthGuard)
  @Get('user')
  async getFavoriteByCategoryId(@Req() req: any): Promise<Favorite[]> {
    if (!req.user || !req.user.user) {
      throw new UnauthorizedException('User not found');
    }
    const userId = req.user.user.id;
    return this.favoriteService.getFavoriteByUserId(userId);
  }

  @Get(':id')
  getFavoriteById(@Param('id') id: string): Promise<Favorite> {
    const favoriteId = parseInt(id);
    return this.favoriteService.getFavoriteById(favoriteId);
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
