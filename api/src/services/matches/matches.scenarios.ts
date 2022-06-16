import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.MatchCreateArgs>({
  match: {
    one: {
      data: {
        location: 'String',
        matchDate: '2022-06-16T16:30:45Z',
        round: 'String',
        updatedAt: '2022-06-16T16:30:45Z',
        maxWagerLimit: 5872378,
        tournament: {
          create: {
            name: 'String',
            startDate: '2022-06-16T16:30:45Z',
            endDate: '2022-06-16T16:30:45Z',
            updatedAt: '2022-06-16T16:30:45Z',
          },
        },
      },
    },
    two: {
      data: {
        location: 'String',
        matchDate: '2022-06-16T16:30:45Z',
        round: 'String',
        updatedAt: '2022-06-16T16:30:45Z',
        maxWagerLimit: 4774458,
        tournament: {
          create: {
            name: 'String',
            startDate: '2022-06-16T16:30:45Z',
            endDate: '2022-06-16T16:30:45Z',
            updatedAt: '2022-06-16T16:30:45Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
