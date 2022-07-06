import { MetaTags } from '@redwoodjs/web'
import HomeMatchesCell from 'src/components/HomeMatchesCell'

const currentTournament = 2

const HomePage = () => (
  <>
    <MetaTags
      title="Home"
      description="Home page for Final Whistle - the football prediction game"
    />
    <HomeMatchesCell tournamentId={currentTournament} />
  </>
)

export default HomePage
