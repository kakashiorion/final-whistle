import type { FindTeamsInMatches } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link, routes } from '@redwoodjs/router'

import TeamsInMatches from 'src/components/TeamsInMatch/TeamsInMatches'

export const QUERY = gql`
  query FindTeamsInMatches {
    teamsInMatches {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No teamsInMatches yet. '}
      <Link to={routes.newTeamsInMatch()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({
  teamsInMatches,
}: CellSuccessProps<FindTeamsInMatches>) => {
  return <TeamsInMatches teamsInMatches={teamsInMatches} />
}
