import type { FindTournaments } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link, routes } from '@redwoodjs/router'

import Tournaments from 'src/components/Tournament/Tournaments'

export const QUERY = gql`
  query FindTournaments {
    tournaments {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No tournaments yet. '}
      <Link to={routes.newTournament()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ tournaments }: CellSuccessProps<FindTournaments>) => {
  return <Tournaments tournaments={tournaments} />
}
