import { db } from 'api/src/lib/db'

export default async () => {
  try {
    const matches = [
      {
        matchId: 35,
        data: {
          homeScore: 0,
          homeScoringPlayers: [],
          awayScore: 0,
          awayScoringPlayers: [],
        },
      },
      {
        matchId: 36,
        data: {
          homeScore: 0,
          homeScoringPlayers: [],
          awayScore: 0,
          awayScoringPlayers: [],
        },
      },
      {
        matchId: 47,
        data: {
          homeScore: 0,
          homeScoringPlayers: [],
          awayScore: 0,
          awayScoringPlayers: [],
        },
      },
      {
        matchId: 48,
        data: {
          homeScore: 0,
          homeScoringPlayers: [],
          awayScore: 0,
          awayScoringPlayers: [],
        },
      },
    ]

    //Script: Update match result data in DB
    Promise.all(
      matches.map(async (match) => {
        const record = await db.match.update({
          data: match.data,
          where: {
            id: match.matchId,
          },
        })
        console.log(record)
      })
    )
  } catch (error) {
    console.error(error)
  }
}