import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.MatchPredictionCreateArgs>({
  matchPrediction: {
    one: {
      data: {
        matchId: 8318127,
        predictedScoringPlayersOfTeam1: 5038891,
        predictedScoringPlayersOfTeam2: 6214288,
        updatedAt: '2022-06-16T16:34:47Z',
        user: {
          create: {
            email: 'String8558462',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2022-06-16T16:34:47Z',
          },
        },
      },
    },
    two: {
      data: {
        matchId: 3636347,
        predictedScoringPlayersOfTeam1: 8568625,
        predictedScoringPlayersOfTeam2: 868180,
        updatedAt: '2022-06-16T16:34:47Z',
        user: {
          create: {
            email: 'String9665908',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2022-06-16T16:34:47Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
