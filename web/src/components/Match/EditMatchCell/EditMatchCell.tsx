import type { EditMatchById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import MatchForm from 'src/components/Match/MatchForm'

export const QUERY = gql`
  query EditMatchById($id: Int!) {
    match: match(id: $id) {
      id
      location
      matchDate
      round
      tournamentId
      createdAt
      updatedAt
      maxWagerLimit
    }
  }
`
const UPDATE_MATCH_MUTATION = gql`
  mutation UpdateMatchMutation($id: Int!, $input: UpdateMatchInput!) {
    updateMatch(id: $id, input: $input) {
      id
      location
      matchDate
      round
      tournamentId
      createdAt
      updatedAt
      maxWagerLimit
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ match }: CellSuccessProps<EditMatchById>) => {
  const [updateMatch, { loading, error }] = useMutation(UPDATE_MATCH_MUTATION, {
    onCompleted: () => {
      toast.success('Match updated')
      navigate(routes.matches())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    const castInput = Object.assign(input, {
      tournamentId: parseInt(input.tournamentId),
    })
    updateMatch({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Match {match.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <MatchForm
          match={match}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
