import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TeamsInMatchCreateArgs>({
  teamsInMatch: {
    one: {
      data: {
        scoringPlayers: 1469240,
        updatedAt: '2022-07-11T18:42:08Z',
        match: {
          create: {
            location: 'String',
            matchDate: '2022-07-11T18:42:08Z',
            round: 'String',
            updatedAt: '2022-07-11T18:42:08Z',
            maxWagerLimit: 2077777,
            tournament: {
              create: {
                name: 'String6940534',
                startDate: '2022-07-11T18:42:08Z',
                endDate: '2022-07-11T18:42:08Z',
                updatedAt: '2022-07-11T18:42:08Z',
              },
            },
          },
        },
        team: {
          create: { name: 'String923948', updatedAt: '2022-07-11T18:42:08Z' },
        },
      },
    },
    two: {
      data: {
        scoringPlayers: 3331764,
        updatedAt: '2022-07-11T18:42:08Z',
        match: {
          create: {
            location: 'String',
            matchDate: '2022-07-11T18:42:08Z',
            round: 'String',
            updatedAt: '2022-07-11T18:42:08Z',
            maxWagerLimit: 9492492,
            tournament: {
              create: {
                name: 'String9640749',
                startDate: '2022-07-11T18:42:08Z',
                endDate: '2022-07-11T18:42:08Z',
                updatedAt: '2022-07-11T18:42:08Z',
              },
            },
          },
        },
        team: {
          create: { name: 'String1349548', updatedAt: '2022-07-11T18:42:08Z' },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
