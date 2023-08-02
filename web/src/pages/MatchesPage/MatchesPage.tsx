import { MetaTags } from '@redwoodjs/web'

import AllMatchesCell from 'src/components/AllMatchesCell'
import { CurrentTournamentID } from 'src/utils'

const MatchesPage = () => {
  return (
    <>
      <MetaTags title="Matches" description="Matches page" />
      <AllMatchesCell tournamentId={CurrentTournamentID} />
    </>
  )
}

export default MatchesPage
