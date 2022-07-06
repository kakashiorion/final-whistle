import type { FindMatchPredictions } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link, routes } from '@redwoodjs/router'

import MatchPredictions from 'src/components/MatchPrediction/MatchPredictions'

export const QUERY = gql`
  query FindMatchPredictions {
    matchPredictions {
      id
      userId
      matchId
      predictedScoreOfTeam1
      predictedScoreOfTeam2
      predictedScoringPlayersOfTeam1
      predictedScoringPlayersOfTeam2
      wageredPoints
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No matchPredictions yet. '}
      <Link to={routes.newMatchPrediction()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({
  matchPredictions,
}: CellSuccessProps<FindMatchPredictions>) => {
  return <MatchPredictions matchPredictions={matchPredictions} />
}
