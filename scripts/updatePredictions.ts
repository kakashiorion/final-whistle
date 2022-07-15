//1. Get actual score reuslt for a match (between timestamps)
//2. Calculate points based on actual and predicted values for all predictions for that match
//3. Update points for each user

import { db } from 'api/src/lib/db'

export default async () => {
  try {
    //Enter ID of matches
    const matches = [3]

    Promise.all(
      //Go through all matches
      matches.map(async (matchId) => {
        const matchResult = await db.teamsInMatch.findMany({
          where: {
            matchId,
          },
        })
        // console.log(matchResult)
        //Get actual results of each match
        const actualScoreOfTeam1 = matchResult[0].score
        const actualScoreOfTeam2 = matchResult[1].score
        const actualScoringPlayersOfTeam1 = matchResult[0].scoringPlayers
        const actualScoringPlayersOfTeam2 = matchResult[1].scoringPlayers
        //Get all the predictions for each match
        const predictions = await db.matchPrediction.findMany({
          where: {
            matchId,
          },
        })
        // console.log(
        //  `Number of predictions for match ${matchId} is ${predictions.length}`
        // )
        //Go through all predictions
        predictions.map(async (prediction) => {
          //Calculate scorelinePoints
          const scorelinePoints =
            getScorelinePoints(
              prediction.predictedScoreOfTeam1,
              prediction.predictedScoreOfTeam2,
              actualScoreOfTeam1,
              actualScoreOfTeam2
            ) * prediction.wageredCoins
          //Calculate bonus goalscorer points
          const goalScorerPoints =
            (findIntersectionCount(
              prediction.predictedScoringPlayersOfTeam1,
              actualScoringPlayersOfTeam1
            ) +
              findIntersectionCount(
                prediction.predictedScoringPlayersOfTeam2,
                actualScoringPlayersOfTeam2
              )) *
            prediction.wageredCoins
          //Calculate totalPoints
          const totalPoints = scorelinePoints + goalScorerPoints

          //Get user currentPoints
          const userData = await db.user.findUnique({
            where: {
              id: prediction.userId,
            },
          })
          // console.log(
          //   'Editing user: ' +
          //     userData.username +
          //     ' with current points: ' +
          //     userData.points
          // )
          //update earned points for this prediction
          // const updatedPrediction =
          await db.matchPrediction.update({
            data: { earnedPoints: totalPoints },
            where: {
              id: prediction.id,
            },
          })
          // console.log(
          //   'Updated prediction points: ' + updatedPrediction.earnedPoints
          // )
          //Update the user's points
          // const updatedUser =
          await db.user.update({
            data: { points: userData.points + totalPoints },
            where: {
              id: prediction.userId,
            },
          })
          // console.log('updated points of user: ' + updatedUser.points)
        })
      })
    )
  } catch (error) {
    console.error(error)
  }
}

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

const getScorelinePoints = (
  predScoreTeam1: number,
  predScoreTeam2: number,
  actualScoreTeam1: number,
  actualScoreTeam2: number
) => {
  if (
    predScoreTeam1 == actualScoreTeam1 &&
    predScoreTeam2 == actualScoreTeam2
  ) {
    return 3
  } else if (
    predScoreTeam1 - predScoreTeam2 ==
    actualScoreTeam1 - actualScoreTeam2
  ) {
    return 2
  } else if (
    (predScoreTeam1 - predScoreTeam2) * (actualScoreTeam1 - actualScoreTeam2) >
    0
  ) {
    return 1
  }
  return 0
}
