import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.MatchPredictionCreateArgs>({
  matchPrediction: {
    one: {
      data: {
        matchId: 8906147,
        predictedScoringPlayersOfTeam1: 9272289,
        predictedScoringPlayersOfTeam2: 4039661,
        updatedAt: '2022-06-18T19:08:09Z',
        user: {
          create: {
            email: 'String3485479',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2022-06-18T19:08:09Z',
          },
        },
      },
    },
    two: {
      data: {
        matchId: 8932940,
        predictedScoringPlayersOfTeam1: 3100721,
        predictedScoringPlayersOfTeam2: 1551,
        updatedAt: '2022-06-18T19:08:09Z',
        user: {
          create: {
            email: 'String1409047',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2022-06-18T19:08:09Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
