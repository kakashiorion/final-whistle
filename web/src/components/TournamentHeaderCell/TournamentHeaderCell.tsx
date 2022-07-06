import type {
  FindTournamentHeaderQuery,
  FindTournamentHeaderQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import defaultTrophy from 'public/tournamentDefault.png'

export const QUERY = gql`
  query FindTournamentHeaderQuery($id: Int!) {
    tournament: tournament(id: $id) {
      id
      name
      logoURL
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindTournamentHeaderQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  tournament,
}: CellSuccessProps<
  FindTournamentHeaderQuery,
  FindTournamentHeaderQueryVariables
>) => {
  return (
    <div
      id="HeaderContentDiv"
      className="flex w-5/6 self-end md:self-start gap-2 md:gap-3 rounded-md justify-end overflow-hidden whitespace-nowrap md:justify-start items-center text-secondary-normal text-sm md:text-lg font-medium"
    >
      <img
        className="h-6 md:h-8"
        src={tournament.logoURL ?? defaultTrophy}
        alt="Tournament logo"
      />
      <p>{tournament.name}</p>
    </div>
  )
}
