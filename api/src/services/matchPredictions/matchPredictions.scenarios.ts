import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.MatchPredictionCreateArgs>({
  matchPrediction: {
    one: {
      data: {
        predictedScoringPlayersOfTeam1: 59831,
        predictedScoringPlayersOfTeam2: 9206931,
        updatedAt: '2022-06-23T15:29:41Z',
        user: {
          create: {
            email: 'String2104859',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2022-06-23T15:29:41Z',
          },
        },
        match: {
          create: {
            location: 'String',
            matchDate: '2022-06-23T15:29:41Z',
            round: 'String',
            updatedAt: '2022-06-23T15:29:41Z',
            maxWagerLimit: 5303524,
            tournament: {
              create: {
                name: 'String',
                startDate: '2022-06-23T15:29:41Z',
                endDate: '2022-06-23T15:29:41Z',
                updatedAt: '2022-06-23T15:29:41Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        predictedScoringPlayersOfTeam1: 5422578,
        predictedScoringPlayersOfTeam2: 1460625,
        updatedAt: '2022-06-23T15:29:41Z',
        user: {
          create: {
            email: 'String7834288',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2022-06-23T15:29:41Z',
          },
        },
        match: {
          create: {
            location: 'String',
            matchDate: '2022-06-23T15:29:41Z',
            round: 'String',
            updatedAt: '2022-06-23T15:29:41Z',
            maxWagerLimit: 2749839,
            tournament: {
              create: {
                name: 'String',
                startDate: '2022-06-23T15:29:41Z',
                endDate: '2022-06-23T15:29:41Z',
                updatedAt: '2022-06-23T15:29:41Z',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
