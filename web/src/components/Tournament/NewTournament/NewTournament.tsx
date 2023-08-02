import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TournamentForm from 'src/components/Tournament/TournamentForm'

const CREATE_TOURNAMENT_MUTATION = gql`
  mutation CreateTournamentMutation($input: CreateTournamentInput!) {
    createTournament(input: $input) {
      id
    }
  }
`

const NewTournament = () => {
  const [createTournament, { loading, error }] = useMutation(
    CREATE_TOURNAMENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Tournament created')
        navigate(routes.tournaments())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createTournament({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Tournament</h2>
      </header>
      <div className="rw-segment-main">
        <TournamentForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewTournament
