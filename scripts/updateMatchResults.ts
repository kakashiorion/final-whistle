import { db } from 'api/src/lib/db'

export default async () => {
  try {
    const matches = [
      {
        teamInMatchId: { matchId: 3, teamId: 5 },
        data: {
          score: 3,
          scoringPlayers: [1, 2],
        },
      },
      {
        teamInMatchId: { matchId: 3, teamId: 6 },
        data: {
          score: 3,
          scoringPlayers: [4],
        },
      },
    ]
    Promise.all(
      matches.map(async (input) => {
        const record = await db.teamsInMatch.update({
          data: input.data,
          where: {
            matchId_teamId: input.teamInMatchId,
          },
        })
        console.log(record)
      })
    )
  } catch (error) {
    console.error(error)
  }
}
