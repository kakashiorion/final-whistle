import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String7355173',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2022-06-16T16:26:30Z',
      },
    },
    two: {
      data: {
        email: 'String6658693',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2022-06-16T16:26:30Z',
      },
    },
  },
})

export type StandardScenario = typeof standard
