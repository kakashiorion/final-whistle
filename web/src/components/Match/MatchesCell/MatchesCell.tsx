import type { FindMatches } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link, routes } from '@redwoodjs/router'

import Matches from 'src/components/Match/Matches'

export const QUERY = gql`
  query FindMatches {
    matches {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No matches yet. '}
      <Link
        to={routes.newMatch()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ matches }: CellSuccessProps<FindMatches>) => {
  return <Matches matches={matches} />
}
