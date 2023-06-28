import type {
  FindStatsBarQuery,
  FindStatsBarQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindStatsBarQuery($id: Int!) {
    mostChosenPlayers(tournamentId: $id) {
      player {
        id
        name
        position
        team {
          id
          name
        }
      }
      occurence
    }
    mostChosenScorelines(tournamentId: $id) {
      scoreline
      occurence
    }
    mostChosenTeams(tournamentId: $id) {
      winningTeams {
        team {
          id
          name
          flagURL
          color
        }
        occurence
      }
      losingTeams {
        team {
          id
          name
          flagURL
          color
        }
        occurence
      }
      drawingTeams {
        team {
          id
          name
          flagURL
          color
        }
        occurence
      }
    }
  }
`

export const Loading = () => {
  return (
    <div className="xl:w-80 xl:py-6 xl:shrink-0 xl:h-full xl:pr-6 hidden xl:flex">
      <div className="animate-pulse h-full rounded-lg w-full bg-black-3"></div>
    </div>
  )
}

export const Success = ({
  mostChosenPlayers,
  mostChosenScorelines,
  mostChosenTeams,
}: CellSuccessProps<FindStatsBarQuery, FindStatsBarQueryVariables>) => {
  return (
    <div className="w-80 py-6 shrink-0 h-full pr-6 hidden xl:flex overflow-hidden">
      <div className="flex flex-col w-full h-full overflow-y-scroll gap-3 nonscroll">
        <div
          id="ScorelinesDiv"
          className="flex w-full p-3 flex-col rounded bg-black-3/70 gap-2"
        >
          <p className="text-primary-normal text-lg">
            Most Predicted Scorelines
          </p>
          <div
            id="mostPredictedScorlines"
            className="flex w-full flex-col gap-1"
          >
            {mostChosenScorelines.map((item, i) => {
              return (
                <div
                  key={i}
                  className="flex items-center justify-between text-base text-white-3"
                >
                  <p>{item.scoreline}</p>
                  <p>{item.occurence}</p>
                </div>
              )
            })}
          </div>
        </div>
        <div
          id="GoalScorersDiv"
          className="flex w-full p-3 flex-col rounded bg-black-3/70 gap-2"
        >
          <p className="text-primary-normal text-lg">
            Most Predicted Goalscorers
          </p>
          <div
            id="mostPredictedScorlines"
            className="flex w-full flex-col gap-1"
          >
            {mostChosenPlayers.map((item, i) => {
              return (
                <div
                  key={i}
                  className="flex items-center justify-between text-base text-white-3"
                >
                  <p>{`${item.player.name} (${item.player.position})`}</p>
                  <p>{item.occurence}</p>
                </div>
              )
            })}
          </div>
        </div>
        <div
          id="WinningDiv"
          className="flex w-full p-3 flex-col rounded bg-black-3/70 gap-2"
        >
          <p className="text-primary-normal text-lg">Most Predicted Winners</p>
          <div id="mostPredictedWinners" className="flex w-full flex-col gap-1">
            {mostChosenTeams.winningTeams.map((item, i) => {
              return (
                <div
                  key={i}
                  className="flex items-center justify-between text-base text-white-3"
                >
                  <p>{item.team.name}</p>
                  <p>{item.occurence}</p>
                </div>
              )
            })}
          </div>
        </div>
        <div
          id="LosingDiv"
          className="flex w-full p-3 flex-col rounded bg-black-3/70 gap-2"
        >
          <p className="text-primary-normal text-lg">Most Predicted Losers</p>
          <div id="mostPredictedLosers" className="flex w-full flex-col gap-1">
            {mostChosenTeams.losingTeams.map((item, i) => {
              return (
                <div
                  key={i}
                  className="flex items-center justify-between text-base text-white-3"
                >
                  <p>{item.team.name}</p>
                  <p>{item.occurence}</p>
                </div>
              )
            })}
          </div>
        </div>
        <div
          id="DrawingDiv"
          className="flex w-full p-3 flex-col rounded bg-black-3/70 gap-2"
        >
          <p className="text-primary-normal text-lg">Most Predicted Drawers</p>
          <div id="mostPredictedDrawers" className="flex w-full flex-col gap-1">
            {mostChosenTeams.drawingTeams.map((item, i) => {
              return (
                <div
                  key={i}
                  className="flex items-center justify-between text-base text-white-3"
                >
                  <p>{item.team.name}</p>
                  <p>{item.occurence}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

/*
Stats:
  - Most chosen goalscorers (5)
      Rank, Name, Position, Team, N
  - Most chosen scorelines (5)
      Rank, Scoreline , N
  - Most chosen winning team (3)
      Rank, Team, N
  - Most chosen drawing team (3)
      Rank, Team, N
  - Most chosen losing team (3)
      Rank, Team, N
  - Top successfully predicted matches (5)
      Rank, Teams, SuccessRate
  -
*/
