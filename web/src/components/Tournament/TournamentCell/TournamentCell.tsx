import type { FindTournamentById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Tournament from 'src/components/Tournament/Tournament'

export const QUERY = gql`
  query FindTournamentById($id: Int!) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Tournament not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ tournament }: CellSuccessProps<FindTournamentById>) => {
  return <Tournament tournament={tournament} />
}
