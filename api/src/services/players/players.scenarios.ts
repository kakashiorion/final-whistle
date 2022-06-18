import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PlayerCreateArgs>({
  player: {
    one: {
      data: {
        name: 'String',
        position: 'String',
        updatedAt: '2022-06-18T19:07:18Z',
      },
    },
    two: {
      data: {
        name: 'String',
        position: 'String',
        updatedAt: '2022-06-18T19:07:18Z',
      },
    },
  },
})

export type StandardScenario = typeof standard
