import { MetaTags } from '@redwoodjs/web'
import AllTeamsCell from 'src/components/AllTeamsCell'

const TeamsPage = () => {
  return (
    <>
      <MetaTags
        title="Teams"
        description="List of all tournament teams in Final Whistle - the football prediction game"
      />

      <AllTeamsCell />
    </>
  )
}

export default TeamsPage
