import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type MatchLayoutProps = {
  children: React.ReactNode
}

const MatchesLayout = ({ children }: MatchLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.matches()} className="rw-link">
            Matches
          </Link>
        </h1>
        <Link to={routes.newMatch()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Match
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default MatchesLayout
