import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type TeamsInMatchLayoutProps = {
  children: React.ReactNode
}

const TeamsInMatchesLayout = ({ children }: TeamsInMatchLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.teamsInMatches()} className="rw-link">
            TeamsInMatches
          </Link>
        </h1>
        <Link
          to={routes.newTeamsInMatch()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New TeamsInMatch
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default TeamsInMatchesLayout
