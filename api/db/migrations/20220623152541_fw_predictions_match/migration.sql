/*
  Warnings:

  - You are about to drop the column `scoringPlayers` on the `TeamsInMatch` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TeamsInMatch" DROP COLUMN "scoringPlayers";

-- CreateTable
CREATE TABLE "_PlayerToTeamsInMatch" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlayerToTeamsInMatch_AB_unique" ON "_PlayerToTeamsInMatch"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayerToTeamsInMatch_B_index" ON "_PlayerToTeamsInMatch"("B");

-- AddForeignKey
ALTER TABLE "MatchPrediction" ADD CONSTRAINT "MatchPrediction_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToTeamsInMatch" ADD CONSTRAINT "_PlayerToTeamsInMatch_A_fkey" FOREIGN KEY ("A") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToTeamsInMatch" ADD CONSTRAINT "_PlayerToTeamsInMatch_B_fkey" FOREIGN KEY ("B") REFERENCES "TeamsInMatch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
