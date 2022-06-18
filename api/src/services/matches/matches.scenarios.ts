import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.MatchCreateArgs>({
  match: {
    one: {
      data: {
        location: 'String',
        matchDate: '2022-06-18T19:07:24Z',
        round: 'String',
        updatedAt: '2022-06-18T19:07:24Z',
        maxWagerLimit: 8089242,
        tournament: {
          create: {
            name: 'String',
            startDate: '2022-06-18T19:07:24Z',
            endDate: '2022-06-18T19:07:24Z',
            updatedAt: '2022-06-18T19:07:24Z',
          },
        },
      },
    },
    two: {
      data: {
        location: 'String',
        matchDate: '2022-06-18T19:07:24Z',
        round: 'String',
        updatedAt: '2022-06-18T19:07:24Z',
        maxWagerLimit: 6841675,
        tournament: {
          create: {
            name: 'String',
            startDate: '2022-06-18T19:07:24Z',
            endDate: '2022-06-18T19:07:24Z',
            updatedAt: '2022-06-18T19:07:24Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
