import moment from 'moment'
import CheckIcon from 'public/CheckIcon.svg'
import logo from 'public/Main 2.png'
import type { HomeMatchesQuery, HomeMatchesQueryVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { currentDate } from 'src/utils'

export const QUERY = gql`
  query HomeMatchesQuery($tournamentId: Int!) {
    tournament: tournament(id: $tournamentId) {
      id
      name
      startDate
      endDate
      matches {
        id
        matchDate
        location
        round
        homeScore
        awayScore
        predictions {
          id
          userId
          predictedScoreOfHomeTeam
          predictedScoreOfAwayTeam
          earnedPoints
        }
        homeTeam {
          id
          name
          flagURL
          color
        }
        awayTeam {
          id
          name
          flagURL
          color
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

export const Success = ({
  tournament,
}: CellSuccessProps<HomeMatchesQuery, HomeMatchesQueryVariables>) => {
  //List of upcoming matches
  const upcomingMatches = tournament.matches
    .filter((match) => moment(match.matchDate).isAfter(moment(currentDate)))
    .sort((a, b) => (moment(a.matchDate).isAfter(moment(b.matchDate)) ? 1 : -1))

  //List of recently completed matches
  const recentMatches = tournament.matches
    .filter((match) => moment(match.matchDate).isBefore(moment(currentDate)))
    .sort((a, b) => (moment(a.matchDate).isAfter(moment(b.matchDate)) ? -1 : 1))

  return (
    <div
      id="HomeMatchesDiv"
      className="flex flex-col items-start overflow-hidden justify-start w-full gap-6 md:gap-8"
    >
      <div
        id="UpcomingMatchesDiv"
        className="flex flex-col w-full p-2 md:p-3 gap-2 md:gap-3 bg-black-3/70 rounded items-start justify-start"
      >
        <div
          id="UpcomingHeader"
          className="flex items-center justify-between w-full gap-1 md:gap-2 px-1"
        >
          <p className="whitespace-nowrap text-base md:text-lg text-primary-normal ">
            Upcoming Matches
          </p>
          <p className="whitespace-nowrap py-1 px-3 md:px-4 text-white-1 rounded-full animate-pulse text-xs md:text-sm bg-green-normal">
            {'PREDICT NOW >'}
          </p>
        </div>
        <div
          id="UpcomingList"
          className="flex w-full overflow-scroll gap-2 md:gap-3 px-1 py-1 justify-start items-start nonscroll"
        >
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
        className="flex flex-col w-full p-2 md:p-3 gap-2 md:gap-3 overflow-hidden bg-black-3/70 rounded items-start justify-start"
      >
        <p className="text-primary-normal w-full whitespace-nowrap text-base md:text-lg px-1">
          Recent Results
        </p>
        <div
          id="RecentMatchesList"
          className="flex flex-col w-full gap-2 md:gap-3 justify-start items-start overflow-y-scroll nonscroll px-3 py-1"
        >
          {recentMatches.length > 0 ? (
            recentMatches.map((match) => {
              return <RecentMatchItem recentMatch={match} key={match.id} />
            })
          ) : (
            <p className="text-xs md:text-sm text-center text-white-3">
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
      <div className="w-40 md:w-48 hover:shadow-sm hover:shadow-primary-normal hover:-translate-y-1 hover:-translate-x-1 hover:bg-green-dark/70 flex flex-col justify-evenly items-center gap-2 md:gap-3 rounded-tl-lg rounded-br-lg bg-dark-2 p-3 md:p-4">
        <div id="teams" className="flex flex-col w-full gap-1 md:gap-1.5">
          <div
            id="team 1"
            className="flex w-full gap-1 md:gap-2 whitespace-nowrap pr-2 md:pr-3 items-center justify-start text-white-1 text-sm md:text-base"
          >
            <img
              className="h-5 md:h-6"
              src={upcomingMatch.homeTeam.flagURL}
              alt="team1 flag"
            />
            <p>{upcomingMatch.homeTeam.name.split(' U-')[0]}</p>
          </div>
          <div
            id="team 2"
            className="flex w-full gap-1 md:gap-2 whitespace-nowrap pl-2 md:pl-3 items-center justify-end text-white-1 text-sm md:text-base"
          >
            <p>{upcomingMatch.awayTeam.name.split(' U-')[0]}</p>
            <img
              className="h-5 md:h-6"
              src={upcomingMatch.awayTeam.flagURL}
              alt="team2 flag"
            />
          </div>
        </div>
        <div
          id="round"
          className="flex flex-col gap-0.5 md:gap-1 items-center justify-center text-white-4 text-xs md:text-sm"
        >
          <p>{upcomingMatch.round}</p>
          <div
            id="dateTime"
            className="flex items-center gap-1 md:gap-2 justify-between"
          >
            <p>{moment(upcomingMatch.matchDate).format('DD MMM')}</p>
            <p>{moment(upcomingMatch.matchDate).format('HH:mm')}</p>
          </div>
        </div>
        <div
          id="predInfo"
          className="flex w-full items-center gap-1 md:gap-2 justify-between"
        >
          <p
            id="predictions"
            className="py-1 md:py-1.5 rounded-full px-3 md:px-4 bg-secondary-light text-[10px] md:text-xs text-black-2"
          >
            {upcomingMatch.predictions.length}
          </p>
          {alreadyPredicted ? <PredictedLabel /> : <></>}
        </div>
      </div>
    </Link>
  )
}

const PredictedLabel = () => {
  return (
    <div className="text-green-dark flex item-center rounded-br-lg rounded-tl-lg p-1 md:p-1.5 text-[10px] md:text-xs bg-white-3">
      <img src={CheckIcon} alt="Predicted Icon" className="h-3 md:h-4 w-3 md:w-4" />
    </div>
  )
}

const RecentMatchItem = ({ recentMatch }) => {
  const { currentUser } = useAuth()
  //Count of successful predictions
  const successCount = recentMatch.predictions.filter(
    (p) =>
      p.predictedScoreOfHomeTeam === recentMatch.homeScore &&
      p.predictedScoreOfAwayTeam === recentMatch.awayScore
  ).length
  //Rate of successful predictions
  const successRate =
    recentMatch.predictions.length != 0
      ? `${(successCount * 100) / recentMatch.predictions.length}%`
      : '0%'
  //Did currentUser make a prediction for this match
  const didPredict = recentMatch.predictions.find(
    (p) => p.userId == currentUser.id
  )

  return (
    <Link
      to={routes.matchResult({ id: recentMatch.id })}
      className={`w-full -skew-x-[12deg] hover:shadow-sm hover:shadow-primary-normal hover:-translate-y-1 hover:-translate-x-1 hover:bg-secondary-dark hover:bg-opacity-60 flex gap-1 md:gap-2 items-center justify-evenly bg-dark-3 px-1 md:px-2 py-2 md:py-3`}
    >
      <div
        id="dateTime"
        className="flex flex-col skew-x-[12deg] whitespace-nowrap gap-1 md:gap-1.5 min-w-[15%] md:min-w-[10%] items-center justify-center text-white-3 text-[10px] md:text-xs"
      >
        <p>{moment(recentMatch.matchDate).format('HH:mm')}</p>
        <p>{moment(recentMatch.matchDate).format('DD MMM')}</p>
      </div>
      <div
        id="round"
        className="hidden md:flex flex-col skew-x-[12deg] whitespace-nowrap gap-1 md:gap-1.5 min-w-[10%] items-center justify-center text-white-3 text-[10px] md:text-xs"
      >
        <p>{recentMatch.round}</p>
      </div>
      <div
        id="flags"
        className="flex flex-col skew-x-[12deg] min-w-[5%] items-end gap-1 md:gap-1.5 justify-center"
      >
        <img
          className="h-4 md:h-5"
          src={recentMatch.homeTeam.flagURL}
          alt="team1 flag"
        />
        <img
          className="h-4 md:h-5"
          src={recentMatch.awayTeam.flagURL}
          alt="team2 flag"
        />
      </div>
      <div
        id="teams"
        className="flex flex-col skew-x-[12deg] gap-1 md:gap-1.5 whitespace-nowrap min-w-[30%] md:min-w-[25%] items-start justify-center text-white-1 text-xs md:text-sm"
      >
        <p>{recentMatch.homeTeam.name.split(' U-')[0]}</p>
        <p>{recentMatch.awayTeam.name.split(' U-')[0]}</p>
      </div>
      <div
        id="score"
        className="flex flex-col skew-x-[12deg] gap-1 md:gap-1.5 whitespace-nowrap min-w-[5%] items-start justify-center text-white-1 text-xs md:text-sm"
      >
        <p>{recentMatch.homeScore ?? '-'}</p>
        <p>{recentMatch.awayScore ?? '-'}</p>
      </div>
      <div
        id="predictions"
        className="py-1 md:py-1.5 skew-x-[12deg] rounded-full whitespace-nowrap px-3 md:px-4 bg-secondary-light flex justify-center items-center text-black-2 text-[10px] md:text-xs"
      >
        <p>{recentMatch.predictions.length}</p>
      </div>
      <div
        id="success"
        className="hidden py-1 md:py-1.5 skew-x-[12deg] rounded-full whitespace-nowrap px-3 md:px-4 bg-green-light md:flex justify-center items-center text-black-2 text-[10px] md:text-xs"
      >
        <p>{successRate}</p>
      </div>
      <div
        id="userPoints"
        className="flex skew-x-[12deg] justify-center items-center whitespace-nowrap min-w-[10%] text-primary-normal text-center text-base md:text-xl"
      >
        {didPredict ? didPredict.earnedPoints : 0}
      </div>
    </Link>
  )
}
