import defaultTrophy from 'public/tournamentDefault.png'
import type {
  FindTournamentHeaderQuery,
  FindTournamentHeaderQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindTournamentHeaderQuery($id: Int!) {
    tournament: tournament(id: $id) {
      id
      name
      logoURL
    }
  }
`

export const Success = ({
  tournament,
}: CellSuccessProps<
  FindTournamentHeaderQuery,
  FindTournamentHeaderQueryVariables
>) => {
  return (
    <div
      id="HeaderContentDiv"
      className="flex w-5/6 self-end gap-2 md:gap-3 rounded-md justify-end whitespace-nowrap items-center text-secondary-normal text-base md:text-xl font-medium"
    >
      <p>{tournament.name}</p>
      <img
        className="h-7 md:h-9"
        src={tournament.logoURL ?? defaultTrophy}
        alt="Tournament logo"
      />
    </div>
  )
}
