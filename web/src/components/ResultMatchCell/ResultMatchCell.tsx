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
        team {
          name
          flagURL
          color
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
  if (userPrediction) {
    const team1PredictedScore = userPrediction.predictedScoreOfTeam1
    const team1PredictedGoalScoringPlayers =
      userPrediction.predictedScoringPlayersOfTeam1

    const team2PredictedScore = userPrediction.predictedScoreOfTeam2
    const team2PredictedGoalScoringPlayers =
      userPrediction.predictedScoringPlayersOfTeam2
  }

  const team1ActualScore = resultMatch.teams[0].score
  const team1ActualScoringPlayers = resultMatch.teams[0].scoringPlayers
  const team2ActualScore = resultMatch.teams[1].score
  const team2ActualScoringPlayers = resultMatch.teams[1].scoringPlayers

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
    </div>
  )
}
