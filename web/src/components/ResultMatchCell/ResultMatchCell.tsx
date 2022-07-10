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
        wageredPoints
      }
      teams {
        id
        scoringPlayers {
          id
          name
          position
        }
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

  const team1ActualScore = resultMatch.teams[0].score ?? 0
  const team1ActualScoringPlayers =
    // resultMatch.teams[0].scoringPlayers ??
    [
      { id: 50, name: 'Player 1' },
      { id: 1, name: 'Player 2' },
    ]
  const team2ActualScore = resultMatch.teams[1].score ?? 0
  const team2ActualScoringPlayers =
    // resultMatch.teams[1].scoringPlayers ??
    [
      { id: 1, name: 'Player 1' },
      { id: 4, name: 'Player 2' },
      { id: 40, name: 'Player 3' },
    ]

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
                return (
                  <div
                    key={i}
                    className="text-xs md:text-sm text-secondary-light justify-end items-center flex gap-1"
                  >
                    <p>
                      {(team1Players.find((e) => e.id === p.id)
                        ? ''
                        : '(OG) ') + p.name}
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
                return (
                  <div
                    key={i}
                    className="text-xs md:text-sm text-secondary-light justify-start items-center flex gap-1"
                  >
                    <img src={goal} className="h-3 md:h-4" alt="Goal" />
                    <p>
                      {p.name +
                        (team2Players.find((e) => e.id === p.id)
                          ? ''
                          : ' (OG)')}
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
        className="flex flex-col min-w-max border-2 border-primary-normal rounded-md px-3 md:px-4 py-2 md:py-3 bg-black-3 bg-opacity-70 gap-2 md:gap-3 items-center justify-start "
      >
        {userPrediction ? (
          <div
            id="userPredictionsDiv"
            className="flex flex-col items-center text-primary-normal"
          >
            <p>Your predicted scoreline</p>
            <p>
              {userPrediction.predictedScoreOfTeam1} -{' '}
              {userPrediction.predictedScoreOfTeam2}
            </p>
            {userPrediction.predictedScoringPlayersOfTeam1.length > 0 ? (
              <>
                <p>
                  Predicted Scorers for{' '}
                  {resultMatch.teams[0].team.name.split('U-')[0]}
                </p>
                <div>
                  {userPrediction.predictedScoringPlayersOfTeam1.map((p, i) => {
                    return (
                      <div key={i}>
                        {team1Players.find((e) => e.id === p).name}
                      </div>
                    )
                  })}
                </div>
              </>
            ) : (
              <></>
            )}
            {userPrediction.predictedScoringPlayersOfTeam2.length > 0 ? (
              <>
                <p>
                  Predicted Scorers for{' '}
                  {resultMatch.teams[1].team.name.split('U-')[0]}
                </p>{' '}
                <div>
                  {userPrediction.predictedScoringPlayersOfTeam2.map((p, i) => {
                    return (
                      <div key={i}>
                        {team1Players.find((e) => e.id === p).name}
                      </div>
                    )
                  })}
                </div>
              </>
            ) : (
              <></>
            )}
            <p>Wagered points: {userPrediction.wageredPoints}</p>
          </div>
        ) : (
          <p className="text-red-normal text-center text-sm md:text-base">
            You did not make any predictions
          </p>
        )}
      </div>
    </div>
  )
}
