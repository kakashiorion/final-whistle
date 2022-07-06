import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TeamsInMatchCreateArgs>({
  teamsInMatch: {
    one: {
      data: {
        updatedAt: '2022-06-23T15:30:07Z',
        match: {
          create: {
            location: 'String',
            matchDate: '2022-06-23T15:30:07Z',
            round: 'String',
            updatedAt: '2022-06-23T15:30:07Z',
            maxWagerLimit: 7849635,
            tournament: {
              create: {
                name: 'String',
                startDate: '2022-06-23T15:30:07Z',
                endDate: '2022-06-23T15:30:07Z',
                updatedAt: '2022-06-23T15:30:07Z',
              },
            },
          },
        },
        team: { create: { name: 'String', updatedAt: '2022-06-23T15:30:07Z' } },
      },
    },
    two: {
      data: {
        updatedAt: '2022-06-23T15:30:07Z',
        match: {
          create: {
            location: 'String',
            matchDate: '2022-06-23T15:30:07Z',
            round: 'String',
            updatedAt: '2022-06-23T15:30:07Z',
            maxWagerLimit: 1814680,
            tournament: {
              create: {
                name: 'String',
                startDate: '2022-06-23T15:30:07Z',
                endDate: '2022-06-23T15:30:07Z',
                updatedAt: '2022-06-23T15:30:07Z',
              },
            },
          },
        },
        team: { create: { name: 'String', updatedAt: '2022-06-23T15:30:07Z' } },
      },
    },
  },
})

export type StandardScenario = typeof standard
