import { MetaTags } from '@redwoodjs/web'
import CurrentUserCell from 'src/components/CurrentUserCell'

const UserProfilePage = () => {
  return (
    <>
      <MetaTags title="UserProfile" description="UserProfile page" />

      <CurrentUserCell />
    </>
  )
}

export default UserProfilePage
