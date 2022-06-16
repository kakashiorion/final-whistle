import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import TeamsInMatchForm from 'src/components/TeamsInMatch/TeamsInMatchForm'

const CREATE_TEAMS_IN_MATCH_MUTATION = gql`
  mutation CreateTeamsInMatchMutation($input: CreateTeamsInMatchInput!) {
    createTeamsInMatch(input: $input) {
      id
    }
  }
`

const NewTeamsInMatch = () => {
  const [createTeamsInMatch, { loading, error }] = useMutation(CREATE_TEAMS_IN_MATCH_MUTATION, {
    onCompleted: () => {
      toast.success('TeamsInMatch created')
      navigate(routes.teamsInMatches())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    const castInput = Object.assign(input, { matchId: parseInt(input.matchId), teamId: parseInt(input.teamId), })
    createTeamsInMatch({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New TeamsInMatch</h2>
      </header>
      <div className="rw-segment-main">
        <TeamsInMatchForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewTeamsInMatch
