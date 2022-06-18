import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TeamsInMatchCreateArgs>({
  teamsInMatch: {
    one: {
      data: {
        scoringPlayers: 2748545,
        updatedAt: '2022-06-18T19:07:42Z',
        match: {
          create: {
            location: 'String',
            matchDate: '2022-06-18T19:07:42Z',
            round: 'String',
            updatedAt: '2022-06-18T19:07:42Z',
            maxWagerLimit: 8172568,
            tournament: {
              create: {
                name: 'String',
                startDate: '2022-06-18T19:07:42Z',
                endDate: '2022-06-18T19:07:42Z',
                updatedAt: '2022-06-18T19:07:42Z',
              },
            },
          },
        },
        team: { create: { name: 'String', updatedAt: '2022-06-18T19:07:42Z' } },
      },
    },
    two: {
      data: {
        scoringPlayers: 62763,
        updatedAt: '2022-06-18T19:07:42Z',
        match: {
          create: {
            location: 'String',
            matchDate: '2022-06-18T19:07:42Z',
            round: 'String',
            updatedAt: '2022-06-18T19:07:42Z',
            maxWagerLimit: 6214521,
            tournament: {
              create: {
                name: 'String',
                startDate: '2022-06-18T19:07:42Z',
                endDate: '2022-06-18T19:07:42Z',
                updatedAt: '2022-06-18T19:07:42Z',
              },
            },
          },
        },
        team: { create: { name: 'String', updatedAt: '2022-06-18T19:07:42Z' } },
      },
    },
  },
})

export type StandardScenario = typeof standard
