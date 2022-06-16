import { Link, routes } from '@redwoodjs/router'

type HomeLayoutProps = {
  children?: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to={routes.matches()}>Matches</Link>
            </li>
            <li>
              <Link to={routes.teams()}>Teams</Link>
            </li>
            <li>
              <Link to={routes.leaderboard()}>Leaderboard</Link>
            </li>
            <li>
              <Link to={routes.rules()}>Rules</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}

export default HomeLayout
