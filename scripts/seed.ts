// import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'
// import { hashPassword } from '@redwoodjs/auth-dbauth-api'

// enum PlayerPosition {
//   GK = 'GK',
//   DF = 'DF',
//   MD = 'MD',
//   FW = 'FW',
// }

export default async () => {
  try {
    //
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
    //
    // Update "const data = []" to match your data model and seeding needs
    //
    // const data: Prisma.UserExampleCreateArgs['data'][] = [
    // To try this example data with the UserExample model in schema.prisma,
    // uncomment the lines below and run 'yarn rw prisma migrate dev'
    //
    // { name: 'alice', email: 'alice@example.com' },
    // { name: 'mark', email: 'mark@example.com' },
    // { name: 'jackie', email: 'jackie@example.com' },
    // { name: 'bob', email: 'bob@example.com' },
    // ]
    // console.log(
    //   "\nUsing the default './scripts/seed.{js,ts}' template\nEdit the file to add seed data\n"
    // )
    // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
    // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
    // Promise.all(
    //   //
    //   // Change to match your data model and seeding needs
    //   //
    //   data.map(async (data: Prisma.UserExampleCreateArgs['data']) => {
    //     const record = await db.userExample.create({ data })
    //     console.log(record)
    //   })
    // )
    // const [hashedPassword, salt] = hashPassword('12345678')
    // console.log(hashedPassword)
    // console.log(salt)
    // const players = [
    //   'GK	Ruslan Neshcheret',
    //   'DF	Kostyantyn Vivcharenko',
    //   'DF	Oleksandr Syrota',
    //   'DF	Maksym Talovyerov',
    //   'MD	Ivan Zhelizko',
    //   'DF	Oleksiy Sych',
    //   'FW	Bohdan Viunnyk',
    //   'DF	Volodymyr Salyuk',
    //   'FW	Danylo Sikan',
    //   'MD	Mykhailo Mudryk',
    //   'FW	Vladyslav Vanat',
    //   'GK	Anatoliy Trubin',
    //   'DF	Rostyslav Lyakh',
    //   'MD	Oleksandr Nazarenko',
    //   'DF	Maksym Braharu',
    //   'DF	Arseniy Batahov',
    //   'MD	Volodymyr Brazhko',
    //   'MD	Dmytro Kryskiv',
    //   'MD	Oleh Ocheretko',
    //   'MD	Oleksiy Kashchuk',
    //   'MD	Artem Bondarenko',
    //   'MD	Heorhiy Sudakov',
    //   'GK	Kiril Fesyun',
    // ]
    // const teamId = 16
    // const playerData = []
    // players.forEach((element) => {
    //   playerData.push({
    //     position: PlayerPosition[element.substring(0, 2)],
    //     name: element.substring(3),
    //     teamId: teamId,
    //   })
    // })
    // const newPlayers = await db.player.createMany({
    //   data: playerData,
    //   skipDuplicates: true,
    // })
    // console.log(newPlayers.count)
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
