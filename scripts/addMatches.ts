import { db } from 'api/src/lib/db'

export default async () => {
  try {

    const matchData=[

      {location:'Eden Park, Auckland',matchDate:new Date('2023-08-05 10:30'),round:'Round of 16',tournamentId:1,homeTeamId:29,awayTeamId:27,maxWagerLimit:200,},
      {location:'Wellington Regional Stadium, Wellington',matchDate:new Date('2023-08-05 13:30'),round:'Round of 16',tournamentId:1,homeTeamId:15,awayTeamId:21,maxWagerLimit:200,},
      {location:'Sydney Football Stadium, Sydney',matchDate:new Date('2023-08-06 07:30'),round:'Round of 16',tournamentId:1,homeTeamId:18,awayTeamId:26,maxWagerLimit:200,},
      {location:'Melbourne Rectangular Stadium, Melbourne',matchDate:new Date('2023-08-06 14:30'),round:'Round of 16',tournamentId:1,homeTeamId:28,awayTeamId:30,maxWagerLimit:200,},
      {location:'Lang Park, Brisbane',matchDate:new Date('2023-08-07 13:30'),round:'Round of 16',tournamentId:1,homeTeamId:9,awayTeamId:20,maxWagerLimit:200,},
      {location:'Sydney Football Stadium, Sydney',matchDate:new Date('2023-08-07 16:30'),round:'Round of 16',tournamentId:1,homeTeamId:2,awayTeamId:8,maxWagerLimit:200,},
      // {location:'Melbourne Rectangular Stadium, Melbourne',matchDate:new Date('2023-08-08 13:30'),round:'Round of 16',tournamentId:1,homeTeamId:14,awayTeamId:3,maxWagerLimit:200,},
      // {location:'Hindmarsh Stadium, Adelaide',matchDate:new Date('2023-08-08 16:30'),round:'Round of 16',tournamentId:1,homeTeamId:3,awayTeamId:22,maxWagerLimit:200,},


      // {location:'Forsyth Barr Stadium, Dunedin',matchDate:new Date('2023-07-28 10:30'),round:'Group G',tournamentId:1,homeTeamId:1,awayTeamId:26,maxWagerLimit:100,},
      // {location:'Wellington Regional Stadium, Wellington',matchDate:new Date('2023-07-29 13:00'),round:'Group G',tournamentId:1,homeTeamId:28,awayTeamId:13,maxWagerLimit:100,},
      // {location:'Waikato Stadium, Hamilton',matchDate:new Date('2023-08-02 12:30'),round:'Group G',tournamentId:1,homeTeamId:1,awayTeamId:28,maxWagerLimit:100,},
      // {location:'Wellington Regional Stadium, Wellington',matchDate:new Date('2023-08-02 13:00'),round:'Group G',tournamentId:1,homeTeamId:26,awayTeamId:13,maxWagerLimit:100,},

      // {location:'Melbourne Rectangular Stadium, Melbourne',matchDate:new Date('2023-07-24 14:00'),round:'Group H',tournamentId:1,homeTeamId:11,awayTeamId:17,maxWagerLimit:100,},
      // {location:'Sydney Football Stadium, Sydney',matchDate:new Date('2023-07-25 07:30'),round:'Group H',tournamentId:1,homeTeamId:6,awayTeamId:16,maxWagerLimit:100,},
      // {location:'Hindmarsh Stadium, Adelaide',matchDate:new Date('2023-07-30 10:00'),round:'Group H',tournamentId:1,homeTeamId:16,awayTeamId:17,maxWagerLimit:100,},
      // {location:'Sydney Football Stadium, Sydney',matchDate:new Date('2023-07-30 15:00'),round:'Group H',tournamentId:1,homeTeamId:11,awayTeamId:6,maxWagerLimit:100,},
      // {location:'Lang Park, Brisbane',matchDate:new Date('2023-08-03 15:30'),round:'Group H',tournamentId:1,homeTeamId:16,awayTeamId:11,maxWagerLimit:100,},
      // {location:'Perth Rectangular Stadium, Perth',matchDate:new Date('2023-08-03 15:30'),round:'Group H',tournamentId:1,homeTeamId:17,awayTeamId:6,maxWagerLimit:100,},
    ]


    const newMatches = await db.match.createMany({
      data: matchData,
      skipDuplicates: true,
    })
    console.log(newMatches.count)
  } catch (error) {
    console.error(error)
  }
}