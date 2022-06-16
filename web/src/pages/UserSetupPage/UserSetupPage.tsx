import { MetaTags } from '@redwoodjs/web'
import CurrentUserCell from 'src/components/CurrentUserCell'

const UserSetupPage = () => {
  return (
    <>
      <MetaTags title="UserSetup" description="UserSetup page" />

      <CurrentUserCell />
    </>
  )
}

export default UserSetupPage
