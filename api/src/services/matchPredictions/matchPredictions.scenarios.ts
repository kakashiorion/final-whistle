import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.MatchPredictionCreateArgs>({
  matchPrediction: {
    one: {
      data: {
        predictedScoringPlayersOfTeam1: 1563080,
        predictedScoringPlayersOfTeam2: 6997592,
        updatedAt: '2022-07-11T16:18:04Z',
        user: {
          create: {
            email: 'String7219443',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2022-07-11T16:18:04Z',
          },
        },
        match: {
          create: {
            location: 'String',
            matchDate: '2022-07-11T16:18:04Z',
            round: 'String',
            updatedAt: '2022-07-11T16:18:04Z',
            maxWagerLimit: 1250610,
            tournament: {
              create: {
                name: 'String2680888',
                startDate: '2022-07-11T16:18:04Z',
                endDate: '2022-07-11T16:18:04Z',
                updatedAt: '2022-07-11T16:18:04Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        predictedScoringPlayersOfTeam1: 6250167,
        predictedScoringPlayersOfTeam2: 7104123,
        updatedAt: '2022-07-11T16:18:04Z',
        user: {
          create: {
            email: 'String4126524',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2022-07-11T16:18:04Z',
          },
        },
        match: {
          create: {
            location: 'String',
            matchDate: '2022-07-11T16:18:04Z',
            round: 'String',
            updatedAt: '2022-07-11T16:18:04Z',
            maxWagerLimit: 3739689,
            tournament: {
              create: {
                name: 'String2239079',
                startDate: '2022-07-11T16:18:04Z',
                endDate: '2022-07-11T16:18:04Z',
                updatedAt: '2022-07-11T16:18:04Z',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
