/*
  Warnings:

  - You are about to drop the `_PlayerToTeamsInMatch` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PlayerToTeamsInMatch" DROP CONSTRAINT "_PlayerToTeamsInMatch_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlayerToTeamsInMatch" DROP CONSTRAINT "_PlayerToTeamsInMatch_B_fkey";

-- AlterTable
ALTER TABLE "TeamsInMatch" ADD COLUMN     "scoringPlayers" INTEGER[];

-- DropTable
DROP TABLE "_PlayerToTeamsInMatch";
