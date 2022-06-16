import { MetaTags } from '@redwoodjs/web'
import AllUsersCell from 'src/components/AllUsersCell'

const LeaderboardPage = () => {
  return (
    <>
      <MetaTags title="Leaderboard" description="Leaderboard page" />

      <AllUsersCell />
    </>
  )
}

export default LeaderboardPage
