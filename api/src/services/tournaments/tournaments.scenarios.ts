import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TournamentCreateArgs>({
  tournament: {
    one: {
      data: {
        name: 'String',
        startDate: '2022-06-16T16:28:59Z',
        endDate: '2022-06-16T16:28:59Z',
        updatedAt: '2022-06-16T16:28:59Z',
      },
    },
    two: {
      data: {
        name: 'String',
        startDate: '2022-06-16T16:28:59Z',
        endDate: '2022-06-16T16:28:59Z',
        updatedAt: '2022-06-16T16:28:59Z',
      },
    },
  },
})

export type StandardScenario = typeof standard
