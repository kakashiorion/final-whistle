import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const ForgotPasswordPage = () => {
  return (
    <>
      <MetaTags title="ForgotPassword" description="ForgotPassword page" />

      <h1>ForgotPasswordPage</h1>
      <p>
        Find me in <code>./web/src/pages/ForgotPasswordPage/ForgotPasswordPage.tsx</code>
      </p>
      <p>
        My default route is named <code>forgotPassword</code>, link to me with `
        <Link to={routes.forgotPassword()}>ForgotPassword</Link>`
      </p>
    </>
  )
}

export default ForgotPasswordPage
