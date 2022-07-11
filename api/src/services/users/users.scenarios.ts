import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String1889472',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2022-07-11T15:30:11Z',
      },
    },
    two: {
      data: {
        email: 'String2689709',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2022-07-11T15:30:11Z',
      },
    },
  },
})

export type StandardScenario = typeof standard
