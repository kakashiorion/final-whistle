import { MetaTags } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/dist/toast'
import UserSetupCell from 'src/components/UserSetupCell'

const UserSetupPage = () => {
  return (
    <>
      <MetaTags
        title="User Setup"
        description="User setup page for Final Whistle - the football prediction game"
      />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 4000 }} />
      <UserSetupCell />
    </>
  )
}

export default UserSetupPage
