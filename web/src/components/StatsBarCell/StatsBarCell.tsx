import type {
  FindStatsBarQuery,
  FindStatsBarQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import moment from 'moment'

export const QUERY = gql`
  query FindStatsBarQuery($id: Int!) {
    tournamentStats: tournament(id: $id) {
      id
      matches {
        id
        matchDate
        location
        round
        predictions {
          id
          predictedScoreOfTeam1
          predictedScoreOfTeam2
          predictedScoringPlayersOfTeam1
          predictedScoringPlayersOfTeam2
        }
        teams {
          id
          team {
            name
            flagURL
            color
          }
          score
          scoringPlayers
        }
      }
    }
  }
`

export const Loading = () => {
  return (
    <div className="lg:w-80 lg:py-10 lg:h-full lg:border-l-[.5px] lg:border-l-black-3 lg:px-1 hidden lg:flex">
      <div className="animate-pulse h-full rounded-lg w-full bg-black-3"></div>
    </div>
  )
}

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindStatsBarQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  tournamentStats,
}: CellSuccessProps<FindStatsBarQuery, FindStatsBarQueryVariables>) => {
  const currentDate = new Date()

  const tournamentMatches = tournamentStats.matches

  const tournamentMatchPredictions = []
  tournamentMatches.forEach((m) =>
    tournamentMatchPredictions.push(...m.predictions)
  )

  const tournamentPredictedScorelines = []
  tournamentMatchPredictions.forEach((p) =>
    tournamentPredictedScorelines.push(
      p.predictedScoreOfTeam1 > p.predictedScoreOfTeam2
        ? [p.predictedScoreOfTeam1, p.predictedScoreOfTeam2]
        : [p.predictedScoreOfTeam2, p.predictedScoreOfTeam1]
    )
  )

  const tournamentPredictedGoalScorers = []
  tournamentMatchPredictions.forEach((p) =>
    tournamentPredictedGoalScorers.push(
      ...p.predictedScoringPlayersOfTeam1,
      ...p.predictedScoringPlayersOfTeam2
    )
  )

  const tournamentActualScorelines = []
  tournamentMatches.forEach(
    (m) =>
      moment(m.matchDate).isBefore(moment(currentDate)) &&
      tournamentActualScorelines.push(
        m.teams[0].score > m.teams[1].score
          ? [(m.teams[0].score, m.teams[1].score)]
          : [(m.teams[1].score, m.teams[0].score)]
      )
  )

  const tournamentActualGoalScorers = []
  tournamentMatches.forEach(
    (m) =>
      moment(m.matchDate).isBefore(moment(currentDate)) &&
      tournamentActualGoalScorers.push(
        ...m.teams[0].scoringPlayers,
        ...m.teams[1].scoringPlayers
      )
  )

  return (
    <div className="lg:w-80 lg:py-10 lg:h-full lg:border-l-[.5px] lg:border-l-black-3 lg:px-1 hidden lg:flex">
      <div id="Scorelines">
        <div id="mostPredictedScorlines"></div>
        <div id="mostSuccessfullyPredictedScorlines"></div>
      </div>
      <div id="GoalScorers">
        <div id="mostPredictedGoalScorers"></div>
        <div id="mostSuccessfullyPredictedGoalScorers"></div>
      </div>
      {/* <div id="Matches">
        <div id="mostPredictedMatches"></div>
        <div id="mostSuccessfullyPredictedMatches"></div>
      </div> */}
    </div>
  )
}
