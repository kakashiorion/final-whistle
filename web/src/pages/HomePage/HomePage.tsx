import { MetaTags } from '@redwoodjs/web'
import HomeMatchesCell from 'src/components/HomeMatchesCell'

const HomePage = () => (
  <>
    <MetaTags
      title="Final Whistle - Home"
      description="Home page of Final Whistle game"
    />
    <HomeMatchesCell />
  </>
)

export default HomePage
