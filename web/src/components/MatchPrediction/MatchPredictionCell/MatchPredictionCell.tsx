import type { FindMatchPredictionById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import MatchPrediction from 'src/components/MatchPrediction/MatchPrediction'

export const QUERY = gql`
  query FindMatchPredictionById($id: Int!) {
    matchPrediction: matchPrediction(id: $id) {
      id
      userId
      matchId
      predictedScoreOfHomeTeam
      predictedScoreOfAwayTeam
      predictedScoringPlayersOfHomeTeam
      predictedScoringPlayersOfAwayTeam
      wageredCoins
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>MatchPrediction not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({
  matchPrediction,
}: CellSuccessProps<FindMatchPredictionById>) => {
  return <MatchPrediction matchPrediction={matchPrediction} />
}
