import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PlayerCreateArgs>({
  player: {
    one: {
      data: {
        name: 'String',
        position: 'String',
        updatedAt: '2022-06-15T18:47:15Z',
      },
    },
    two: {
      data: {
        name: 'String',
        position: 'String',
        updatedAt: '2022-06-15T18:47:15Z',
      },
    },
  },
})

export type StandardScenario = typeof standard
