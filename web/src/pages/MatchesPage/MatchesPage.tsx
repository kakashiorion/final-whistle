import { MetaTags } from '@redwoodjs/web'
import AllMatchesCell from 'src/components/AllMatchesCell'

const MatchesPage = () => {
  return (
    <>
      <MetaTags title="Matches" description="Matches page" />
      <AllMatchesCell />
    </>
  )
}

export default MatchesPage
