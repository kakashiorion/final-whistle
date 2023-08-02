import { db } from 'api/src/lib/db'

export default async () => {
  try {
    enum PlayerPosition {
      GK = 'GK',
      DF = 'DF',
      MF = 'MD',
      FW = 'FW',
    }
    const players = [
      'GK	Yoon Young-geul',
      'DF	Choo Hyo-joo',
      'DF	Hong Hye-ji',
      'DF	Shim Seo-yeon',
      'MF	Kim Yun-ji',
      'DF	Lim Seon-joo',
      'FW	Son Hwa-yeon',
      'MF	Cho So-hyun',
      'MF	Lee Geum-min',
      'MF	Ji So-yun',
      'FW	Choe Yu-ri',
      'FW	Moon Mi-ra',
      'FW	Park Eun-sun',
      'MF	Jeon Eun-ha',
      'MF	Chun Ga-ram',
      'DF	Jang Sel-gi',
      'DF	Lee Young-ju',
      'GK	Kim Jung-mi',
      'FW	Casey Phair',
      'DF	Kim Hye-ri',
      'GK	Ryu Ji-soo',
      'MF	Bae Ye-bin',
      'FW	Kang Chae-rim',
    ]
    const teamId = 16
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
