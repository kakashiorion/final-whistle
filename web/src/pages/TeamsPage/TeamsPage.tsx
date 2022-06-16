import { MetaTags } from '@redwoodjs/web'
import AllTeamsCell from 'src/components/AllTeamsCell'

const TeamsPage = () => {
  return (
    <>
      <MetaTags title="Teams" description="Teams page" />

      <AllTeamsCell />
    </>
  )
}

export default TeamsPage
