/*
  Warnings:

  - You are about to drop the column `earnedPoints` on the `MatchPrediction` table. All the data in the column will be lost.
  - You are about to drop the column `predictedScoreTeam1` on the `MatchPrediction` table. All the data in the column will be lost.
  - You are about to drop the column `predictedScoreTeam2` on the `MatchPrediction` table. All the data in the column will be lost.
  - You are about to drop the column `teamScore` on the `TeamsInMatch` table. All the data in the column will be lost.
  - You are about to drop the column `resetToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetTokenExpiresAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `roles` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Gamer', 'Admin');

-- AlterTable
ALTER TABLE "MatchPrediction" DROP COLUMN "earnedPoints",
DROP COLUMN "predictedScoreTeam1",
DROP COLUMN "predictedScoreTeam2",
ADD COLUMN     "predictedScoreOfTeam1" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "predictedScoreOfTeam2" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "flagURL" TEXT,
ALTER COLUMN "color" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TeamsInMatch" DROP COLUMN "teamScore",
ADD COLUMN     "score" INTEGER;

-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "logoURL" TEXT,
ALTER COLUMN "venue" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "resetToken",
DROP COLUMN "resetTokenExpiresAt",
DROP COLUMN "roles",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT E'Gamer',
ALTER COLUMN "points" DROP NOT NULL,
ALTER COLUMN "points" DROP DEFAULT;

-- CreateTable
CREATE TABLE "_TeamToTournament" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TeamToTournament_AB_unique" ON "_TeamToTournament"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamToTournament_B_index" ON "_TeamToTournament"("B");

-- AddForeignKey
ALTER TABLE "_TeamToTournament" ADD CONSTRAINT "_TeamToTournament_A_fkey" FOREIGN KEY ("A") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamToTournament" ADD CONSTRAINT "_TeamToTournament_B_fkey" FOREIGN KEY ("B") REFERENCES "Tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;
