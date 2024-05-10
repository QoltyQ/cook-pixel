import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/users/user.module';
import { IngredientModule } from 'src/ingredients/ingredient.module';
import { RecipeModule } from 'src/recipes/recipe.module';
import { CategoryModule } from 'src/categories/category.module';
import { RecipeIngredientModule } from 'src/RecipeIngredient/RecipeIngredient.module';
import { FavoriteModule } from 'src/favorites/favorites.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    AuthModule,
    UserModule,
    IngredientModule,
    RecipeModule,
    CategoryModule,
    RecipeIngredientModule,
    FavoriteModule,
    MulterModule.register({ dest: './uploads' }),
    ServeStaticModule.forRoot({
      rootPath: './uploads',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
