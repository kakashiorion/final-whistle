import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import CurrentUserCell from 'src/components/CurrentUserCell'

const UserProfilePage = () => {
  const { currentUser } = useAuth()
  return (
    <>
      <MetaTags title="UserProfile" description="UserProfile page" />

      <CurrentUserCell id={currentUser.id} />
    </>
  )
}

export default UserProfilePage
