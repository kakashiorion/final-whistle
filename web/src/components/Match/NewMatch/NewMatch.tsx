import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import MatchForm from 'src/components/Match/MatchForm'

const CREATE_MATCH_MUTATION = gql`
  mutation CreateMatchMutation($input: CreateMatchInput!) {
    createMatch(input: $input) {
      id
    }
  }
`

const NewMatch = () => {
  const [createMatch, { loading, error }] = useMutation(CREATE_MATCH_MUTATION, {
    onCompleted: () => {
      toast.success('Match created')
      navigate(routes.matches())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    const castInput = Object.assign(input, {
      tournamentId: parseInt(input.tournamentId),
    })
    createMatch({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Match</h2>
      </header>
      <div className="rw-segment-main">
        <MatchForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewMatch
