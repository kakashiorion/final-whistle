/*
  Warnings:

  - You are about to drop the column `wageredPoints` on the `MatchPrediction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MatchPrediction" DROP COLUMN "wageredPoints",
ADD COLUMN     "wageredCoins" INTEGER NOT NULL DEFAULT 10;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "coins" INTEGER;
