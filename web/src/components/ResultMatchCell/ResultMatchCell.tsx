import type {
  FindResultMatchQuery,
  FindResultMatchQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
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

export const Failure = ({
  error,
}: CellFailureProps<FindResultMatchQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

const currentDate = new Date()

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

  return <div id="matchResultDiv" className=""></div>
}
