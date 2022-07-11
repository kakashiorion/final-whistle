import type {
  FindResultMatchQuery,
  FindResultMatchQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps } from '@redwoodjs/web'
import { navigate, Redirect, routes } from '@redwoodjs/router'
import logo from 'public/Main 2.png'
import { useEffect } from 'react'
import { useAuth } from '@redwoodjs/auth'
import moment from 'moment'
import goal from 'public/goal.png'
import whistle from 'public/Whistle.png'

export const QUERY = gql`
  query FindResultMatchQuery($id: Int!) {
    resultMatch: match(id: $id) {
      id
      matchDate
      location
      round
      maxWagerLimit
      predictions {
        id
        userId
        predictedScoreOfTeam1
        predictedScoreOfTeam2
        predictedScoringPlayersOfTeam1
        predictedScoringPlayersOfTeam2
        wageredCoins
        earnedPoints
      }
      teams {
        id
        scoringPlayers
        score
        teamId
        team {
          id
          name
          flagURL
          color
          players {
            id
            name
            position
          }
        }
      }
    }
  }
`

export const Loading = () => (
  <div className="h-full w-full flex items-center justify-center">
    <img className="max-h-[25vh] animate-bounce" src={logo} alt="FW logo" />
  </div>
)

export const Empty = () => <Redirect to={routes.home()} />

const currentDate = new Date('15 Aug 2022')

export const Success = ({
  resultMatch,
}: CellSuccessProps<FindResultMatchQuery, FindResultMatchQueryVariables>) => {
  const { currentUser } = useAuth()

  const userPrediction = resultMatch.predictions.find(
    (p) => p.userId == currentUser.id
  )

  const team1ActualScore = resultMatch.teams[0].score ?? 3
  const team1ActualScoringPlayers =
    // resultMatch.teams[0].scoringPlayers ??
    [1, 4, 2]
  const team2ActualScore = resultMatch.teams[1].score ?? 3
  const team2ActualScoringPlayers =
    // resultMatch.teams[1].scoringPlayers ??
    [5, 4, 3]

  const team1Players = resultMatch.teams[0].team.players
  const team2Players = resultMatch.teams[1].team.players

  useEffect(() => {
    if (moment(resultMatch.matchDate).isAfter(moment(currentDate))) {
      navigate(routes.home())
    }
  }, [resultMatch.matchDate])

  return (
    <div
      id="matchResultDiv"
      className="flex flex-col w-full overflow-y-scroll gap-2 md:gap-3 nonscroll"
    >
      <div
        id="infoDiv"
        className="flex px-2 md:px-3 py-2 md:py-3 gap-2 md:gap-3
       bg-tertiary-dark bg-opacity-80 rounded-md
      justify-between items-center w-full text-white-3 text-xs md:text-sm"
      >
        <div className="flex flex-col gap-1 md:gap-2">
          <p>{resultMatch.round}</p>
          <p>{resultMatch.location}</p>
        </div>
        <div className="flex flex-col gap-1 md:gap-2 items-end">
          <p>{moment(resultMatch.matchDate).format('HH:mm')}</p>
          <p>{moment(resultMatch.matchDate).format('DD MMM')}</p>
        </div>
      </div>
      <div
        id="resultDiv"
        className="flex flex-col min-w-max rounded-md px-3 md:px-4 py-2 md:py-3 bg-black-1 bg-opacity-70 gap-2 md:gap-3"
      >
        <div
          id="scorelineDiv"
          className="flex w-full gap-2 md:gap-3 items-start justify-center"
        >
          <div id="team1Div" className="flex flex-col items-end gap-1 md:gap-2">
            <div
              id="team1ScorelineDiv"
              className="flex gap-2 md:gap-3 items-center justify-center"
            >
              <img
                id="team1Flag"
                className="h-4 md:h-5 aspect-video"
                src={resultMatch.teams[0].team.flagURL}
                alt="Team 1 flag"
              />
              <p
                id="team1Name"
                className="text-white-1 text-base md:text-lg whitespace-nowrap"
              >
                {resultMatch.teams[0].team.name.split('U-')[0]}
              </p>
              <p
                id="team1ActualScore"
                className="text-primary-normal text-2xl md:text-3xl font-bold"
              >
                {team1ActualScore}
              </p>
            </div>
            <div
              id="team1ScorersDiv"
              className="flex flex-col gap-1 md:gap-2 items-end"
            >
              {team1ActualScoringPlayers.map((p, i) => {
                const player = team1Players.find((e) => e.id === p)
                return (
                  <div
                    key={i}
                    className="text-xs md:text-sm text-secondary-light justify-end items-center flex gap-1"
                  >
                    <p>
                      {player
                        ? player.name
                        : team2Players.find((e) => e.id === p)?.name + ' (OG)'}
                    </p>
                    <img src={goal} className="h-3 md:h-4" alt="Goal" />
                  </div>
                )
              })}
            </div>
          </div>
          <p
            id="vs"
            className="flex text-white-3 px-1 md:px-2 text-lg md:text-xl"
          >
            -
          </p>
          <div
            id="team2Div"
            className="flex flex-col items-start gap-1 md:gap-2"
          >
            <div
              id="team2ScorelineDiv"
              className="flex gap-2 md:gap-3 items-center justify-center"
            >
              <p
                id="team2ActualScore"
                className="text-primary-normal text-2xl md:text-3xl font-bold "
              >
                {team2ActualScore}
              </p>
              <p
                id="team2Name"
                className="text-white-1 text-base md:text-lg whitespace-nowrap"
              >
                {resultMatch.teams[1].team.name.split('U-')[0]}
              </p>
              <img
                id="team2Flag"
                className="h-4 md:h-5 aspect-video"
                src={resultMatch.teams[1].team.flagURL}
                alt="Team 2 flag"
              />
            </div>
            <div
              id="team2ScorersDiv"
              className="flex flex-col gap-1 md:gap-2 items-start"
            >
              {team2ActualScoringPlayers.map((p, i) => {
                const player = team2Players.find((e) => e.id === p)

                return (
                  <div
                    key={i}
                    className="text-xs md:text-sm text-secondary-light justify-start items-center flex gap-1"
                  >
                    <img src={goal} className="h-3 md:h-4" alt="Goal" />
                    <p>
                      {player
                        ? player.name
                        : team1Players.find((e) => e.id === p)?.name + ' (OG)'}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div
        id="predictionResultDiv"
        className="flex flex-col min-w-max rounded-md px-2 md:px-3 py-2 md:py-3 bg-black-3 bg-opacity-70 gap-2 md:gap-3 items-start"
      >
        {userPrediction ? (
          <div
            id="userPredictionsDiv"
            className="w-full text-white-3  flex flex-col items-start gap-2 md:gap-3"
          >
            <p className="text-xs md:text-sm font-bold">YOUR PREDICTIONS</p>
            <div
              id="scorelinePredDiv"
              className="w-full -skew-x-[6deg] bg-black-1 flex gap-1 md:gap-2 rounded-sm items-center justify-center border-[1px] border-primary-normal px-1 md:px-2 py-2 md:py-3"
            >
              <p className="flex w-full items-center justify-center">
                {' '}
                {resultMatch.teams[0].team.name.split('U-')[0]}{' '}
                {userPrediction.predictedScoreOfTeam1}
                <img
                  src={whistle}
                  className="h-4 md:h-5 px-1"
                  alt="Final Whistle"
                ></img>
                {userPrediction.predictedScoreOfTeam2}{' '}
                {resultMatch.teams[1].team.name.split('U-')[0]}
              </p>
              {getScorelinePoints(
                userPrediction.predictedScoreOfTeam1,
                userPrediction.predictedScoreOfTeam2,
                team1ActualScore,
                team2ActualScore
              )}
            </div>
            <div
              id="goalscorersPredDiv"
              className="w-full -skew-x-[6deg] bg-black-1 flex items-start rounded-sm justify-center border-[1px] border-primary-normal px-1 md:px-2 py-2 md:py-3 gap-5 md:gap-6"
            >
              <div
                id="team1PredScorers"
                className="flex flex-col w-full items-end basis-1/2 gap-1 md:gap-2"
              >
                {userPrediction.predictedScoringPlayersOfTeam1.map((p, i) => {
                  return (
                    <div key={i} className="flex items-center gap-1 text-xs">
                      {team1Players.find((e) => e.id === p).name}{' '}
                      <img src={goal} className="h-3 md:h-4" alt="Goal" />
                    </div>
                  )
                })}
              </div>
              <div
                id="team2PredScorers"
                className="flex flex-col w-full items-start basis-1/2 gap-1 md:gap-2"
              >
                {userPrediction.predictedScoringPlayersOfTeam2.map((p, i) => {
                  return (
                    <div key={i} className="flex items-center gap-1 text-xs">
                      {' '}
                      <img src={goal} className="h-3 md:h-4" alt="Goal" />
                      {team2Players.find((e) => e.id === p).name}
                    </div>
                  )
                })}
              </div>
              {getGoalscorerPoints(
                userPrediction.predictedScoringPlayersOfTeam1,
                userPrediction.predictedScoringPlayersOfTeam2,
                team1ActualScoringPlayers,
                team2ActualScoringPlayers
              )}
            </div>
            <div className=" w-full flex gap-3 md:gap-4 justify-between items-center">
              <div className="flex rounded-md px-3 py-2 bg-primary-dark">
                Wagered Coins: {userPrediction.wageredCoins}
              </div>
              <div className="flex rounded-md px-3 py-2 bg-green-dark">
                Earned points: {userPrediction.earnedPoints}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-red-light text-center self-center text-sm md:text-base">
            You did not make any predictions for this match
          </p>
        )}
      </div>
    </div>
  )
}

function findIntersectionCount(a: number[], b: number[]) {
  let count = 0
  b = b.filter((p) => a.includes(p))
  a.forEach((p) => {
    const index = b.indexOf(p)
    if (index > -1) {
      count += 1
      b.splice(index, 1)
    }
  })
  return count
}

const getGoalscorerPoints = (
  predScoringPlayersTeam1: number[],
  predScoringPlayersTeam2: number[],
  actualScoringPlayersTeam1: number[],
  actualScoringPlayersTeam2: number[]
) => {
  const team1Score = findIntersectionCount(
    predScoringPlayersTeam1,
    actualScoringPlayersTeam1
  )
  const team2Score = findIntersectionCount(
    predScoringPlayersTeam2,
    actualScoringPlayersTeam2
  )
  const count = team1Score + team2Score
  if (count == 0) {
    return (
      <div
        id="scorerMultiplier"
        className="bg-red-dark px-2 md:px-3 py-1 text-[10px] md:text-xs rounded-full"
      >
        {count}X
      </div>
    )
  }
  return (
    <div
      id="scorerMultiplier"
      className="bg-secondary-dark px-2 md:px-3 py-1 text-[10px] md:text-xs rounded-full"
    >
      {count}X
    </div>
  )
}

const getScorelinePoints = (
  predScoreTeam1: number,
  predScoreTeam2: number,
  actualScoreTeam1: number,
  actualScoreTeam2: number
) => {
  if (
    predScoreTeam1 == actualScoreTeam1 &&
    predScoreTeam2 == actualScoreTeam2
  ) {
    return (
      <div
        id="3x"
        className="bg-green-dark px-2 md:px-3 py-1 text-[10px] md:text-xs rounded-full"
      >
        3X
      </div>
    )
  } else if (
    predScoreTeam1 - predScoreTeam2 ==
    actualScoreTeam1 - actualScoreTeam2
  ) {
    return (
      <div
        id="2x"
        className="bg-green-normal px-2 md:px-3 py-1 text-[10px] md:text-xs rounded-full"
      >
        2X
      </div>
    )
  } else if (
    (predScoreTeam1 - predScoreTeam2) * (actualScoreTeam1 - actualScoreTeam2) >
    0
  ) {
    return (
      <div
        id="1x"
        className="bg-primary-dark px-2 md:px-3 py-1 text-[10px] md:text-xs rounded-full"
      >
        1X
      </div>
    )
  }
  return (
    <div
      id="0x"
      className="bg-red-dark px-2 md:px-3 py-1 text-[10px] md:text-xs rounded-full"
    >
      0X
    </div>
  )
}
