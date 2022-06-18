import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TournamentCreateArgs>({
  tournament: {
    one: {
      data: {
        name: 'String',
        startDate: '2022-06-18T19:07:02Z',
        endDate: '2022-06-18T19:07:02Z',
        updatedAt: '2022-06-18T19:07:02Z',
      },
    },
    two: {
      data: {
        name: 'String',
        startDate: '2022-06-18T19:07:02Z',
        endDate: '2022-06-18T19:07:02Z',
        updatedAt: '2022-06-18T19:07:02Z',
      },
    },
  },
})

export type StandardScenario = typeof standard
