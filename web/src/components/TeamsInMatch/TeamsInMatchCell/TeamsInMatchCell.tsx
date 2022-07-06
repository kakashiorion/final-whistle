import type { FindTeamsInMatchById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import TeamsInMatch from 'src/components/TeamsInMatch/TeamsInMatch'

export const QUERY = gql`
  query FindTeamsInMatchById($id: Int!) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>TeamsInMatch not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({
  teamsInMatch,
}: CellSuccessProps<FindTeamsInMatchById>) => {
  return <TeamsInMatch teamsInMatch={teamsInMatch} />
}
