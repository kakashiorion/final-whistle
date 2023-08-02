import type { FindMatchById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Match from 'src/components/Match/Match'

export const QUERY = gql`
  query FindMatchById($id: Int!) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Match not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ match }: CellSuccessProps<FindMatchById>) => {
  return <Match match={match} />
}
