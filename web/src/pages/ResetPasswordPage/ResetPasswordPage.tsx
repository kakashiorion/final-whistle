import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const ResetPasswordPage = () => {
  return (
    <>
      <MetaTags title="ResetPassword" description="ResetPassword page" />

      <h1>ResetPasswordPage</h1>
      <p>
        Find me in <code>./web/src/pages/ResetPasswordPage/ResetPasswordPage.tsx</code>
      </p>
      <p>
        My default route is named <code>resetPassword</code>, link to me with `
        <Link to={routes.resetPassword()}>ResetPassword</Link>`
      </p>
    </>
  )
}

export default ResetPasswordPage
