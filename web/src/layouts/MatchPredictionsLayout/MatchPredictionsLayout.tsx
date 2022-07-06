import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type MatchPredictionLayoutProps = {
  children: React.ReactNode
}

const MatchPredictionsLayout = ({ children }: MatchPredictionLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.matchPredictions()} className="rw-link">
            MatchPredictions
          </Link>
        </h1>
        <Link
          to={routes.newMatchPrediction()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New MatchPrediction
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default MatchPredictionsLayout
