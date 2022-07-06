import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PlayerCreateArgs>({
  player: {
    one: {
      data: {
        name: 'String',
        position: 'String',
        updatedAt: '2022-06-23T15:30:28Z',
      },
    },
    two: {
      data: {
        name: 'String',
        position: 'String',
        updatedAt: '2022-06-23T15:30:28Z',
      },
    },
  },
})

export type StandardScenario = typeof standard
