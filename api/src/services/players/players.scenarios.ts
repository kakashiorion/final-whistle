import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PlayerCreateArgs>({
  player: {
    one: {
      data: {
        name: 'String715735',
        position: 'String',
        updatedAt: '2022-07-11T18:41:51Z',
      },
    },
    two: {
      data: {
        name: 'String4291968',
        position: 'String',
        updatedAt: '2022-07-11T18:41:51Z',
      },
    },
  },
})

export type StandardScenario = typeof standard
