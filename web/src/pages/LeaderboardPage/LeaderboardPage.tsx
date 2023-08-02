import { MetaTags } from '@redwoodjs/web'

import AllUsersCell from 'src/components/AllUsersCell'

const LeaderboardPage = () => {
  return (
    <>
      <MetaTags
        title="Leaderboard"
        description="Leaderboard page for Final Whistle - the football prediction game"
      />

      <AllUsersCell />
    </>
  )
}

export default LeaderboardPage
