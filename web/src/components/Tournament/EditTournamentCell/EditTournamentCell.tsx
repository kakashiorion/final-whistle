import type { EditTournamentById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import TournamentForm from 'src/components/Tournament/TournamentForm'

export const QUERY = gql`
  query EditTournamentById($id: Int!) {
    tournament: tournament(id: $id) {
      id
      name
      venue
      logoURL
      startDate
      endDate
      createdAt
      updatedAt
    }
  }
`
const UPDATE_TOURNAMENT_MUTATION = gql`
  mutation UpdateTournamentMutation($id: Int!, $input: UpdateTournamentInput!) {
    updateTournament(id: $id, input: $input) {
      id
      name
      venue
      logoURL
      startDate
      endDate
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({
  tournament,
}: CellSuccessProps<EditTournamentById>) => {
  const [updateTournament, { loading, error }] = useMutation(
    UPDATE_TOURNAMENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Tournament updated')
        navigate(routes.tournaments())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateTournament({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Tournament {tournament.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <TournamentForm
          tournament={tournament}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
