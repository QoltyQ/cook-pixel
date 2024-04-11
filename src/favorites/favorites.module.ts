import { Module } from '@nestjs/common';
import { FavoriteController } from './favorites.controller';
import FavoriteRepository from './favorites.repository';
import { FavoriteService } from './favorites.service';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteRepository, FavoriteService],
})
export class FavoriteModule {}
