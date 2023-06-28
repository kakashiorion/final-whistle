import { MetaTags } from '@redwoodjs/web'

import HomeMatchesCell from 'src/components/HomeMatchesCell'
import { CurrentTournamentID } from 'src/utils'

const HomePage = () => (
  <>
    <MetaTags
      title="Home"
      description="Home page for Final Whistle - the football prediction game"
    />
    <HomeMatchesCell tournamentId={CurrentTournamentID} />
  </>
)

export default HomePage
