import { MetaTags } from '@redwoodjs/web'

import AllTeamsCell from 'src/components/AllTeamsCell'
import { CurrentTournamentID } from 'src/utils'

const TeamsPage = () => {
  return (
    <>
      <MetaTags
        title="Teams"
        description="List of all tournament teams in Final Whistle - the football prediction game"
      />

      <AllTeamsCell tournamentId={CurrentTournamentID} />
    </>
  )
}

export default TeamsPage
