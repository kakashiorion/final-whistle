//1. Get actual score result for a match (between timestamps)
//2. Calculate points based on actual and predicted values for all predictions for that match
//3. Update points for each user

import { db } from 'api/src/lib/db'

export default async () => {
  try {
    //TODO: Enter ID of matches for which predictions and points are to be updated
    const matches = [3, 6]

    //Script: Update prediction data in DB
    Promise.all(
      //Go through all matches
      matches.map(async (matchId) => {
        const matchResult = await db.match.findFirst({
          where: {
            id: matchId,
          },
        })
        //Get actual results of the match
        const actualScoreOfTeam1 = matchResult.homeScore
        const actualScoreOfTeam2 = matchResult.awayScore
        const actualScoringPlayersOfTeam1 = matchResult.homeScoringPlayers
        const actualScoringPlayersOfTeam2 = matchResult.awayScoringPlayers
        //Get all the predictions for the match
        const predictions = await db.matchPrediction.findMany({
          where: {
            matchId: matchId,
          },
        })
        //Go through all predictions
        predictions.map(async (prediction) => {
          //Calculate scoreline multiplier for each prediction
          const scorelineMult = getScorelinePoints(
            prediction.predictedScoreOfHomeTeam,
            prediction.predictedScoreOfAwayTeam,
            actualScoreOfTeam1,
            actualScoreOfTeam2
          )
          //Calculate bonus goalscorer multiplier for each prediction
          const goalScorerMult =
            findIntersectionCount(
              prediction.predictedScoringPlayersOfHomeTeam,
              actualScoringPlayersOfTeam1
            ) +
            findIntersectionCount(
              prediction.predictedScoringPlayersOfAwayTeam,
              actualScoringPlayersOfTeam2
            )
          //Calculate totalPoints for each prediction
          const totalPoints =
            (scorelineMult + goalScorerMult) * prediction.wageredCoins

          //update earned points for each prediction
          await db.matchPrediction.update({
            data: {
              earnedPoints: totalPoints,
              goalScorerMultiplier: goalScorerMult,
              scorelineMultiplier: scorelineMult,
            },
            where: {
              id: prediction.id,
            },
          })
          //Get predicting user's data
          const userData = await db.user.findUnique({
            where: {
              id: prediction.userId,
            },
          })
          //Update the user's points
          await db.user.update({
            data: { points: userData.points + totalPoints },
            where: {
              id: prediction.userId,
            },
          })
          console.log(
            `updated ${userData.id} with ${
              userData.points + totalPoints
            } points`
          )
        })
        console.log(
          `Updated ${predictions.length} predictions for match ${matchId}`
        )
      })
    )
  } catch (error) {
    console.error(error)
  }
}

//Find goalScorer prediction match count with actual
function findIntersectionCount(a: number[], b: number[]) {
  let count = 0
  b = b.filter((p) => a.includes(p))
  a.forEach((p) => {
    const index = b.indexOf(p)
    if (index > -1) {
      count += 1
      b.splice(index, 1)
    }
  })
  return count
}

//Get scoreline points (3:exact scoreline; 2:same goal diff; 1:same result)
const getScorelinePoints = (
  predScoreTeam1: number,
  predScoreTeam2: number,
  actualScoreTeam1: number,
  actualScoreTeam2: number
) => {
  if (
    //Exactly the same scoreline
    predScoreTeam1 == actualScoreTeam1 &&
    predScoreTeam2 == actualScoreTeam2
  ) {
    return 3
  } else if (
    //Same goal difference
    predScoreTeam1 - predScoreTeam2 ==
    actualScoreTeam1 - actualScoreTeam2
  ) {
    return 2
  } else if (
    //Same result
    (predScoreTeam1 - predScoreTeam2) * (actualScoreTeam1 - actualScoreTeam2) >
    0
  ) {
    return 1
  }
  return 0
}
