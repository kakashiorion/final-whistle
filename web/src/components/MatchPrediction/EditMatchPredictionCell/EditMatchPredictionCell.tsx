import type { EditMatchPredictionById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import MatchPredictionForm from 'src/components/MatchPrediction/MatchPredictionForm'

export const QUERY = gql`
  query EditMatchPredictionById($id: Int!) {
    matchPrediction: matchPrediction(id: $id) {
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
const UPDATE_MATCH_PREDICTION_MUTATION = gql`
  mutation UpdateMatchPredictionMutation($id: Int!, $input: UpdateMatchPredictionInput!) {
    updateMatchPrediction(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ matchPrediction }: CellSuccessProps<EditMatchPredictionById>) => {
  const [updateMatchPrediction, { loading, error }] = useMutation(UPDATE_MATCH_PREDICTION_MUTATION, {
    onCompleted: () => {
      toast.success('MatchPrediction updated')
      navigate(routes.matchPredictions())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    const castInput = Object.assign(input, { userId: parseInt(input.userId), matchId: parseInt(input.matchId), })
    updateMatchPrediction({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit MatchPrediction {matchPrediction.id}</h2>
      </header>
      <div className="rw-segment-main">
        <MatchPredictionForm matchPrediction={matchPrediction} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
