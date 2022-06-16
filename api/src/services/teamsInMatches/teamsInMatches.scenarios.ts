import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TeamsInMatchCreateArgs>({
  teamsInMatch: {
    one: {
      data: {
        scoringPlayers: 6740180,
        updatedAt: '2022-06-16T16:32:32Z',
        match: {
          create: {
            location: 'String',
            matchDate: '2022-06-16T16:32:32Z',
            round: 'String',
            updatedAt: '2022-06-16T16:32:32Z',
            maxWagerLimit: 6208135,
            tournament: {
              create: {
                name: 'String',
                startDate: '2022-06-16T16:32:32Z',
                endDate: '2022-06-16T16:32:32Z',
                updatedAt: '2022-06-16T16:32:32Z',
              },
            },
          },
        },
        team: { create: { name: 'String', updatedAt: '2022-06-16T16:32:32Z' } },
      },
    },
    two: {
      data: {
        scoringPlayers: 6122966,
        updatedAt: '2022-06-16T16:32:32Z',
        match: {
          create: {
            location: 'String',
            matchDate: '2022-06-16T16:32:32Z',
            round: 'String',
            updatedAt: '2022-06-16T16:32:32Z',
            maxWagerLimit: 1497321,
            tournament: {
              create: {
                name: 'String',
                startDate: '2022-06-16T16:32:32Z',
                endDate: '2022-06-16T16:32:32Z',
                updatedAt: '2022-06-16T16:32:32Z',
              },
            },
          },
        },
        team: { create: { name: 'String', updatedAt: '2022-06-16T16:32:32Z' } },
      },
    },
  },
})

export type StandardScenario = typeof standard
