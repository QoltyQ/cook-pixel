/*
  Warnings:

  - The primary key for the `RecipeIngredient` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("id");
