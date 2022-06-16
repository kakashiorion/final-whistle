import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TeamCreateArgs>({
  team: {
    one: { data: { name: 'String', updatedAt: '2022-06-16T16:29:13Z' } },
    two: { data: { name: 'String', updatedAt: '2022-06-16T16:29:13Z' } },
  },
})

export type StandardScenario = typeof standard
