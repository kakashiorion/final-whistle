import { db } from 'api/src/lib/db'

export default async () => {
  try {

    const teamData=[
      {name:'Argentina',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/ARG'},
      {name:'Australia',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/AUS'},
      {name:'Brazil',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/BRA'},
      {name:'Canada',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/CAN'},
      {name:'China',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/CHN'},
      {name:'Colombia',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/COL'},
      {name:'Costa Rica',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/CRC'},
      {name:'Denmark',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/DEN'},
      {name:'England',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/ENG'},
      {name:'France',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/FRA'},
      {name:'Germany',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/GER'},
      {name:'Haiti',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/HAI'},
      {name:'Italy',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/ITA'},
      {name:'Jamaica',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/JAM'},
      {name:'Japan',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/JPN'},
      {name:'South Korea',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/KOR'},
      {name:'Morocco',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/MAR'},
      {name:'Netherlands',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/NED'},
      {name:'New Zealand',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/NZL'},
      {name:'Nigeria',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/NGA'},
      {name:'Norway',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/NOR'},
      {name:'Panama',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/PAN'},
      {name:'Philippines',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/PHI'},
      {name:'Portugal',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/POR'},
      {name:'Ireland',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/IRL'},
      {name:'South Africa',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/RSA'},
      {name:'Spain',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/ESP'},
      {name:'Sweden',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/SWE'},
      {name:'Switzerland',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/SUI'},
      {name:'USA',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/USA'},
      {name:'Vietnam',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/VIE'},
      {name:'Zambia',flagURL:'https://api.fifa.com/api/v3/picture/flags-sq-4/ZAM'},
    ]


    const newTeams = await db.team.createMany({
      data: teamData,
      skipDuplicates: true,
    })
    console.log(newTeams.count)
  } catch (error) {
    console.error(error)
  }
}