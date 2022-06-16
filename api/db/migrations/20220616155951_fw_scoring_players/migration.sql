/*
  Warnings:

  - You are about to drop the column `scoringPlayersOfTeam1` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `scoringPlayersOfTeam2` on the `Match` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "scoringPlayersOfTeam1",
DROP COLUMN "scoringPlayersOfTeam2";

-- AlterTable
ALTER TABLE "TeamsInMatch" ADD COLUMN     "scoringPlayers" INTEGER[];
