import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TeamCreateArgs>({
  team: {
    one: { data: { name: 'String', updatedAt: '2022-06-18T19:07:10Z' } },
    two: { data: { name: 'String', updatedAt: '2022-06-18T19:07:10Z' } },
  },
})

export type StandardScenario = typeof standard
