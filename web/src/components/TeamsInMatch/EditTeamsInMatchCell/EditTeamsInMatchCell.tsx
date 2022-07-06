import type { EditTeamsInMatchById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import TeamsInMatchForm from 'src/components/TeamsInMatch/TeamsInMatchForm'

export const QUERY = gql`
  query EditTeamsInMatchById($id: Int!) {
    teamsInMatch: teamsInMatch(id: $id) {
      id
      matchId
      teamId
      score
      createdAt
      updatedAt
    }
  }
`
const UPDATE_TEAMS_IN_MATCH_MUTATION = gql`
  mutation UpdateTeamsInMatchMutation($id: Int!, $input: UpdateTeamsInMatchInput!) {
    updateTeamsInMatch(id: $id, input: $input) {
      id
      matchId
      teamId
      score
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ teamsInMatch }: CellSuccessProps<EditTeamsInMatchById>) => {
  const [updateTeamsInMatch, { loading, error }] = useMutation(UPDATE_TEAMS_IN_MATCH_MUTATION, {
    onCompleted: () => {
      toast.success('TeamsInMatch updated')
      navigate(routes.teamsInMatches())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    const castInput = Object.assign(input, { matchId: parseInt(input.matchId), teamId: parseInt(input.teamId), })
    updateTeamsInMatch({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit TeamsInMatch {teamsInMatch.id}</h2>
      </header>
      <div className="rw-segment-main">
        <TeamsInMatchForm teamsInMatch={teamsInMatch} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
