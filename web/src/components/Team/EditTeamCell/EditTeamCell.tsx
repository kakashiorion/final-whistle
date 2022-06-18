import type { EditTeamById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import TeamForm from 'src/components/Team/TeamForm'

export const QUERY = gql`
  query EditTeamById($id: Int!) {
    team: team(id: $id) {
      id
      name
      color
      color2
      flagURL
      createdAt
      updatedAt
    }
  }
`
const UPDATE_TEAM_MUTATION = gql`
  mutation UpdateTeamMutation($id: Int!, $input: UpdateTeamInput!) {
    updateTeam(id: $id, input: $input) {
      id
      name
      color
      color2
      flagURL
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ team }: CellSuccessProps<EditTeamById>) => {
  const [updateTeam, { loading, error }] = useMutation(UPDATE_TEAM_MUTATION, {
    onCompleted: () => {
      toast.success('Team updated')
      navigate(routes.teams())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateTeam({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Team {team.id}</h2>
      </header>
      <div className="rw-segment-main">
        <TeamForm team={team} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
