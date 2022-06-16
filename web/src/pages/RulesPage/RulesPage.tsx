import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const RulesPage = () => {
  return (
    <>
      <MetaTags title="Rules" description="Rules page" />

      <h1>RulesPage</h1>
      <p>
        Find me in <code>./web/src/pages/RulesPage/RulesPage.tsx</code>
      </p>
      <p>
        My default route is named <code>rules</code>, link to me with `
        <Link to={routes.rules()}>Rules</Link>`
      </p>
    </>
  )
}

export default RulesPage
