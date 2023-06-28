import { db } from 'api/src/lib/db'

export default async () => {
  try {
    enum PlayerPosition {
      GK = 'GK',
      DF = 'DF',
      MD = 'MD',
      FW = 'FW',
    }
    const players = [
      'GK	James Trafford',
      'DF	Max Aarons',
      'DF	Luke Thomas',
      'DF	Levi Colwill',
      'DF	Taylor Harwood-Bellis',
      'MD	Oliver Skipp',
      'MD	Morgan Gibbs-White',
      'MD	Jacob Ramsey',
      'FW	Cameron Archer',
      'MD	Emile Smith Rowe',
      'MD	Anthony Gordon',
      'DF	Jarrad Branthwaite',
      'GK	Josh Griffiths',
      'MD	James Garner',
      'DF	Charlie Cresswell',
      'DF	Ben Johnson',
      'MD	Curtis Jones',
      'MD	Tommy Doyle',
      'MD	Harvey Elliott',
      'MD	Cole Palmer',
      'MD	Angel Gomes',
      'GK	Carl Rushworth',
      'MD	Noni Madueke',
    ]
    const teamId = 4
    const playerData = []
    players.forEach((element) => {
      playerData.push({
        position: PlayerPosition[element.substring(0, 2)],
        name: element.substring(3),
        teamId: teamId,
      })
    })
    const newPlayers = await db.player.createMany({
      data: playerData,
      skipDuplicates: true,
    })
    console.log(newPlayers.count)
  } catch (error) {
    console.error(error)
  }
}
