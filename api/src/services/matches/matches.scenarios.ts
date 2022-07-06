import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.MatchCreateArgs>({
  match: {
    one: {
      data: {
        location: 'String',
        matchDate: '2022-06-23T15:30:18Z',
        round: 'String',
        updatedAt: '2022-06-23T15:30:18Z',
        maxWagerLimit: 4929258,
        tournament: {
          create: {
            name: 'String',
            startDate: '2022-06-23T15:30:18Z',
            endDate: '2022-06-23T15:30:18Z',
            updatedAt: '2022-06-23T15:30:18Z',
          },
        },
      },
    },
    two: {
      data: {
        location: 'String',
        matchDate: '2022-06-23T15:30:18Z',
        round: 'String',
        updatedAt: '2022-06-23T15:30:18Z',
        maxWagerLimit: 2628046,
        tournament: {
          create: {
            name: 'String',
            startDate: '2022-06-23T15:30:18Z',
            endDate: '2022-06-23T15:30:18Z',
            updatedAt: '2022-06-23T15:30:18Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
