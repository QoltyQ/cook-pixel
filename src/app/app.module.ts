import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/users/user.module';
import { IngredientModule } from 'src/ingredients/ingredient.module';
import { RecipeModule } from 'src/recipes/recipe.module';
import { CategoryModule } from 'src/categories/category.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    IngredientModule,
    RecipeModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
