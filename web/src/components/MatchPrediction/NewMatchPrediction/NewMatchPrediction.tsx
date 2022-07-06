import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import MatchPredictionForm from 'src/components/MatchPrediction/MatchPredictionForm'

const CREATE_MATCH_PREDICTION_MUTATION = gql`
  mutation CreateMatchPredictionMutation($input: CreateMatchPredictionInput!) {
    createMatchPrediction(input: $input) {
      id
    }
  }
`

const NewMatchPrediction = () => {
  const [createMatchPrediction, { loading, error }] = useMutation(
    CREATE_MATCH_PREDICTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('MatchPrediction created')
        navigate(routes.matchPredictions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    const castInput = Object.assign(input, {
      userId: parseInt(input.userId),
      matchId: parseInt(input.matchId),
    })
    createMatchPrediction({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New MatchPrediction</h2>
      </header>
      <div className="rw-segment-main">
        <MatchPredictionForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewMatchPrediction
