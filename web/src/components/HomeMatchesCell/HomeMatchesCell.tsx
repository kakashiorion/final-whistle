import type { HomeMatchesQuery, HomeMatchesQueryVariables } from 'types/graphql'
import type { CellSuccessProps } from '@redwoodjs/web'
import moment from 'moment'
import logo from 'public/Main 2.png'
import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

export const QUERY = gql`
  query HomeMatchesQuery($tournamentId: Int!) {
    tournament: tournament(id: $tournamentId) {
      id
      name
      logoURL
      matches {
        id
        matchDate
        location
        round
        predictions {
          id
          userId
          wageredCoins
          earnedPoints
          predictedScoreOfTeam1
          predictedScoreOfTeam2
          predictedScoringPlayersOfTeam1
          predictedScoringPlayersOfTeam2
        }
        teams {
          id
          scoringPlayers
          team {
            id
            name
            flagURL
            color
          }
          score
        }
      }
    }
  }
`

export const Loading = () => (
  <div className="h-full w-full flex items-center justify-center">
    <img className="max-h-[25vh] animate-bounce" src={logo} alt="FW logo" />
  </div>
)

export const Empty = () => <div>No tournament is currently active!</div>

const currentDate = new Date('15 Aug 2022')

export const Success = ({
  tournament,
}: CellSuccessProps<HomeMatchesQuery, HomeMatchesQueryVariables>) => {
  //List of upcoming matches
  const upcomingMatches = tournament.matches
    .filter(
      (match) =>
        moment(match.matchDate).isAfter(moment(currentDate)) &&
        match.teams.length > 0
    )
    .sort((a, b) => (moment(a.matchDate).isAfter(moment(b.matchDate)) ? 1 : -1))

  //List of recently completed matches
  const recentMatches = tournament.matches
    .filter(
      (match) =>
        !moment(match.matchDate).isAfter(moment(currentDate)) &&
        match.teams.length > 0
    )
    .sort((a, b) => (moment(a.matchDate).isAfter(moment(b.matchDate)) ? -1 : 1))

  return (
    <div
      id="MatchesDiv"
      className="flex flex-col h-full items-start pb-3 md:pb-4 justify-start w-full gap-8 md:gap-10 rounded-md "
    >
      <div
        id="UpcomingMatchesDiv"
        className="flex flex-col w-full px-2 md:px-3 py-2 md:py-3 gap-2 md:gap-3 max-h-[30vh] bg-black-3 bg-opacity-60 rounded-md items-start justify-start"
      >
        <p className="text-light-3 text-xs md:text-sm font-bold">
          UPCOMING MATCHES
        </p>
        <div className="flex w-full h-full overflow-x-scroll rounded-md gap-2 md:gap-3 justify-start items-start nonscroll">
          {upcomingMatches.length > 0 ? (
            upcomingMatches.map((match) => {
              return <UpcomingMatchItem upcomingMatch={match} key={match.id} />
            })
          ) : (
            <p className="text-xs md:text-sm text-red-light">
              Tournament has finished.. Check the leaderboard!
            </p>
          )}
        </div>
      </div>
      <div
        id="RecentMatchesDiv"
        className="flex flex-col w-full px-2 md:px-3 py-2 md:py-3 gap-2 md:gap-3 max-h-[40vh] bg-black-3 bg-opacity-60 rounded-md items-start justify-start"
      >
        <p className="text-light-3 text-xs md:text-sm font-bold">
          RECENT RESULTS
        </p>
        <div className="flex flex-col w-full gap-1 md:gap-1 justify-start items-start rounded-md overflow-y-scroll nonscroll px-2">
          {recentMatches.length > 0 ? (
            recentMatches.map((match) => {
              return <RecentMatchItem recentMatch={match} key={match.id} />
            })
          ) : (
            <p className="text-xs md:text-sm text-red-light">
              Tournament is yet to start!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

const UpcomingMatchItem = ({ upcomingMatch }) => {
  const { currentUser } = useAuth()
  const alreadyPredicted = upcomingMatch.predictions.find(
    (p) => p.userId == currentUser.id
  )
  return (
    <Link to={routes.matchPredict({ id: upcomingMatch.id })}>
      <div className="h-full min-w-max hover:-translate-y-1 hover:-translate-x-1 hover:bg-green-dark hover:bg-opacity-60 flex flex-col justify-evenly gap-1 md:gap-2 rounded-tl-xl rounded-br-xl bg-dark-2 px-2 md:px-3 py-2 md:py-3 ">
        <div
          id="row1"
          className="flex items-center gap-1 md:gap-2 justify-between"
        >
          <div
            id="round"
            className="flex flex-col whitespace-nowrap gap-1 items-start justify-evenly text-white-3 text-[8px] md:text-[10px]"
          >
            <p>{upcomingMatch.round.split('-')[0]}</p>
            <p>{upcomingMatch.round.split('-')[1]}</p>
          </div>
          <div
            id="dateTime"
            className="flex flex-col whitespace-nowrap gap-1 items-end justify-evenly text-white-3 text-[8px] md:text-[10px]"
          >
            <p>{moment(upcomingMatch.matchDate).format('HH:mm')}</p>
            <p>{moment(upcomingMatch.matchDate).format('DD MMM')}</p>
          </div>
        </div>
        <div id="row2" className="flex flex-col w-full gap-1 md:gap-2">
          <div
            id="team 1"
            className="flex w-full gap-1 md:gap-2 whitespace-nowrap pr-2 md:pr-3 items-center justify-start text-white-1 text-xs md:text-sm"
          >
            <img
              className="h-3 md:h-4 aspect-video"
              src={upcomingMatch.teams[0].team.flagURL}
              alt="team1 flag"
            />
            <p>{upcomingMatch.teams[0].team.name.split('U-')[0]}</p>
          </div>
          <div
            id="team 2"
            className="flex w-full gap-1 md:gap-2 whitespace-nowrap pl-2 md:pl-3 items-center justify-end text-white-1 text-xs md:text-sm"
          >
            <p>{upcomingMatch.teams[1].team.name.split('U-')[0]}</p>
            <img
              className="h-3 md:h-4 aspect-video"
              src={upcomingMatch.teams[1].team.flagURL}
              alt="team2 flag"
            />
          </div>
        </div>
        <div
          id="row3"
          className="flex items-center gap-1 md:gap-2 justify-between"
        >
          <div
            id="predictions"
            className="py-1 border-secondary-light border-[1px] rounded-md px-1 md:px-2 whitespace-nowrap text-secondary-light text-[8px] md:text-[10px] font-bold"
          >
            <p>{upcomingMatch.predictions.length}</p>
          </div>
          {alreadyPredicted ? <PredictedLabel /> : <></>}
        </div>
      </div>
    </Link>
  )
}
const PredictedLabel = () => {
  return (
    <div className="bg-green-dark rounded-sm px-1 py-[2px] text-[8px] md:text-[10px] text-white-3">
      PREDICTED
    </div>
  )
}

const NotPredictedLabel = () => {
  return (
    <div className="text-red-light text-[8px] md:text-[10px] line-through">
      PRED
    </div>
  )
}

const RecentMatchItem = ({ recentMatch }) => {
  const { currentUser } = useAuth()
  //Count of successful predictions
  const successCount = recentMatch.predictions.filter(
    (p) =>
      p.predictedScoreOfTeam1 === recentMatch.teams[0].team.score &&
      p.predictedScoreOfTeam2 === recentMatch.teams[1].team.score
  ).length
  //Rate of successful predictions
  const successRate =
    recentMatch.predictions.length != 0
      ? `${(successCount * 100) / recentMatch.predictions.length}%`
      : '-'
  //Did currentUser make a prediction for this match
  const didPredict = recentMatch.predictions.find(
    (p) => p.userId == currentUser.id
  )

  return (
    <>
      <Link
        to={routes.matchResult({ id: recentMatch.id })}
        className={`w-full -skew-x-[12deg] hover:-translate-y-1 hover:-translate-x-1 hover:bg-secondary-dark hover:bg-opacity-60 flex gap-1 md:gap-2 items-center justify-evenly bg-tertiary-dark px-1 md:px-2 py-2 md:py-3`}
      >
        <div
          id="dateTime"
          className="flex flex-col skew-x-[12deg] whitespace-nowrap gap-1 min-w-[15%] sm:min-w-[10%] items-center justify-evenly text-white-3 text-[10px] md:text-xs"
        >
          <p>{moment(recentMatch.matchDate).format('HH:mm')}</p>
          <p>{moment(recentMatch.matchDate).format('DD MMM')}</p>
        </div>
        <div
          id="round"
          className="hidden sm:flex flex-col skew-x-[12deg] whitespace-nowrap gap-1 min-w-[10%] items-center justify-evenly text-white-3 text-[10px] md:text-xs"
        >
          <p>{recentMatch.round.split('-')[0]}</p>
          <p>{recentMatch.round.split('-')[1]}</p>
        </div>
        <div
          id="flags"
          className="flex flex-col skew-x-[12deg] min-w-[5%] items-end gap-1 justify-center"
        >
          <img
            className="h-3 md:h-4 aspect-video"
            src={recentMatch.teams[0].team.flagURL}
            alt="team1 flag"
          />
          <img
            className="h-3 md:h-4 aspect-video"
            src={recentMatch.teams[1].team.flagURL}
            alt="team2 flag"
          />
        </div>
        <div
          id="teams"
          className="flex flex-col skew-x-[12deg] gap-1 whitespace-nowrap min-w-[30%] md:min-w-[25%] items-start justify-center text-white-1 text-xs md:text-sm"
        >
          <p>{recentMatch.teams[0].team.name.split('U-')[0]}</p>
          <p>{recentMatch.teams[1].team.name.split('U-')[0]}</p>
        </div>
        <div
          id="score"
          className="flex flex-col skew-x-[12deg] gap-1 whitespace-nowrap min-w-[5%] items-start justify-evenly text-white-1 text-xs md:text-sm"
        >
          <p>{recentMatch.teams[0].team.score ?? 0}</p>
          <p>{recentMatch.teams[1].team.score ?? 0}</p>
        </div>
        <div
          id="predictions"
          className="py-1 md:py-[6px] skew-x-[12deg] rounded-lg whitespace-nowrap min-w-[10%] px-1 md:px-2 bg-secondary-light flex justify-center items-center text-black-2 text-[8px] md:text-[10px]"
        >
          <p>{recentMatch.predictions.length}</p>
        </div>
        <div
          id="success"
          className="py-1 md:py-[6px] skew-x-[12deg] rounded-lg whitespace-nowrap min-w-[10%] px-1 md:px-2 bg-green-light flex justify-center items-center text-black-2 text-[8px] md:text-[10px]"
        >
          <p>{successRate}</p>
        </div>
        <div
          id="userPoints"
          className="flex skew-x-[12deg] justify-center items-center whitespace-nowrap min-w-[15%] text-primary-light text-center text-[8px] md:text-[10px]"
        >
          {didPredict ? (
            <p>
              {didPredict.earnedPoints}
              PTS
            </p>
          ) : (
            <NotPredictedLabel />
          )}
        </div>
      </Link>
    </>
  )
}
