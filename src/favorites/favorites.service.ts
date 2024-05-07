import { Injectable } from '@nestjs/common';
import { Favorite } from '@prisma/client';
import { CreateFavoriteDto } from './favorites.dto';
import FavoriteRepository from './favorites.repository';

@Injectable()
export class FavoriteService {
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  createFavorite(
    userId: number,
    ingredient: CreateFavoriteDto,
  ): Promise<Favorite> {
    return this.favoriteRepository.createFavorite(userId, ingredient);
  }

  getFavorites(): Promise<Favorite[]> {
    return this.favoriteRepository.getFavorites();
  }

  getFavoriteById(id: number): Promise<Favorite> {
    return this.favoriteRepository.getFavoriteById(id);
  }

  getFavoriteByUserId(Favorite: number): Promise<Favorite[]> {
    return this.favoriteRepository.getFavoriteByUserId(Favorite);
  }

  updateFavorite(id: number, ingredient: Favorite): Promise<Favorite> {
    return this.favoriteRepository.updateFavorite(id, ingredient);
  }

  deleteFavorite(id: number): Promise<Favorite> {
    return this.favoriteRepository.deleteFavorite(id);
  }
}
