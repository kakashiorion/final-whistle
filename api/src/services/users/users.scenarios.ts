import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String4796569',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2022-06-18T19:07:56Z',
      },
    },
    two: {
      data: {
        email: 'String1304944',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2022-06-18T19:07:56Z',
      },
    },
  },
})

export type StandardScenario = typeof standard
