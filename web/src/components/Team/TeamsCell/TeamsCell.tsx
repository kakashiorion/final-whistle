import type { FindTeams } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Teams from 'src/components/Team/Teams'

export const QUERY = gql`
  query FindTeams {
    teams {
      id
      name
      color
      flagURL
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No teams yet. '}
      <Link to={routes.newTeam()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ teams }: CellSuccessProps<FindTeams>) => {
  return <Teams teams={teams} />
}
