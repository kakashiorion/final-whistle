import { useEffect } from 'react'

import moment from 'moment'
import dice from 'public/diceBet.png'
import goal from 'public/goal.png'
import logo from 'public/Main 2.png'
import whistle from 'public/Whistle.png'
import type {
  FindResultMatchQuery,
  FindResultMatchQueryVariables,
} from 'types/graphql'

import { navigate, Redirect, routes } from '@redwoodjs/router'
import type { CellSuccessProps } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

export const QUERY = gql`
  query FindResultMatchQuery($id: Int!) {
    resultMatch: match(id: $id) {
      id
      matchDate
      location
      round
      maxWagerLimit
      homeScore
      awayScore
      homeScoringPlayers
      awayScoringPlayers
      predictions {
        id
        userId
        predictedScoreOfHomeTeam
        predictedScoreOfAwayTeam
        predictedScoringPlayersOfHomeTeam
        predictedScoringPlayersOfAwayTeam
        scorelineMultiplier
        goalScorerMultiplier
        wageredCoins
        earnedPoints
      }
      homeTeam {
        id
        name
        flagURL
        color
        players {
          id
          name
          position
        }
      }
      awayTeam {
        id
        name
        flagURL
        color
        players {
          id
          name
          position
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

export const Empty = () => <Redirect to={routes.home()} />

const currentDate = new Date()

export const Success = ({
  resultMatch,
}: CellSuccessProps<FindResultMatchQuery, FindResultMatchQueryVariables>) => {
  const { currentUser } = useAuth()

  const userPrediction = resultMatch.predictions.find(
    (p) => p.userId == currentUser.id
  )

  const team1ActualScore = resultMatch.homeScore
  const team1ActualScoringPlayers = resultMatch.homeScoringPlayers
  const team2ActualScore = resultMatch.awayScore
  const team2ActualScoringPlayers = resultMatch.awayScoringPlayers

  const team1Players = resultMatch.homeTeam.players
  const team2Players = resultMatch.awayTeam.players

  //Count of successful predictions
  const successCount = resultMatch.predictions.filter(
    (p) =>
      p.predictedScoreOfHomeTeam === resultMatch.homeScore &&
      p.predictedScoreOfAwayTeam === resultMatch.awayScore
  ).length
  //Rate of successful predictions
  const successRate =
    resultMatch.predictions.length != 0
      ? `${(successCount * 100) / resultMatch.predictions.length}%`
      : 'N/A'

  useEffect(() => {
    //Cannot view result of a match not yet played; Redirect to home
    if (
      moment(resultMatch.matchDate).isAfter(moment(currentDate)) ||
      resultMatch.homeScore == null ||
      resultMatch.awayScore == null
    ) {
      navigate(routes.home())
    }
  }, [resultMatch.awayScore, resultMatch.homeScore, resultMatch.matchDate])

  return (
    <div
      id="matchResultDiv"
      className="flex flex-col w-full overflow-y-scroll gap-4 md:gap-5 nonscroll"
    >
      <div id="HeaderDiv" className="flex gap-2 md:gap-3 justify-between">
        <p
          id="Header"
          className="text-lg w-full md:text-2xl text-primary-normal"
        >
          Match Result
        </p>
        <p
          id="predictionsLength"
          className="py-1 md:py-1.5 rounded-full whitespace-nowrap px-3 md:px-4 bg-secondary-light flex justify-center items-center text-black-2 text-[10px] md:text-xs"
        >
          {resultMatch.predictions.length}
        </p>
        <p
          id="successRate"
          className="py-1 md:py-1.5 rounded-full whitespace-nowrap px-3 md:px-4 bg-green-light flex justify-center items-center text-black-2 text-[10px] md:text-xs"
        >
          {successRate}
        </p>
      </div>
      <div
        id="infoDiv"
        className="flex py-2 md:py-3 px-3 md:px-4 gap-2 md:gap-3
       bg-dark-3/70 rounded
      justify-between items-center w-full text-white-3 text-sm md:text-base"
      >
        <div
          id="matchInfo"
          className="flex flex-col gap-1 md:gap-2 items-start"
        >
          <p>{resultMatch.round}</p>
          <p>{resultMatch.location}</p>
        </div>
        <div id="matchTime" className="flex flex-col gap-1 md:gap-2 items-end">
          <p>{moment(resultMatch.matchDate).format('HH:mm')}</p>
          <p>{moment(resultMatch.matchDate).format('DD MMM')}</p>
        </div>
      </div>
      <div
        id="resultDiv"
        className="flex flex-col min-w-max rounded p-3 md:p-4 bg-black-1/70 gap-2 md:gap-3"
      >
        <div
          id="scorelineDiv"
          className="flex w-full gap-2 md:gap-3 items-start justify-center"
        >
          <div id="team1Div" className="flex flex-col items-end gap-2 md:gap-3">
            <div
              id="team1ScorelineDiv"
              className="flex gap-2 md:gap-3 items-center justify-center"
            >
              <img
                id="team1Flag"
                className="h-6 md:h-8"
                src={resultMatch.homeTeam.flagURL}
                alt="Team 1 flag"
              />
              <p id="team1Name" className="text-white-1 text-base md:text-2xl">
                {resultMatch.homeTeam.name.split(' U-')[0]}
              </p>
              <p
                id="team1ActualScore"
                className="text-primary-normal text-xl md:text-3xl font-bold"
              >
                {team1ActualScore}
              </p>
            </div>
            <div
              id="team1ScorersDiv"
              className="flex flex-col gap-1 md:gap-2 items-end"
            >
              {team1ActualScoringPlayers.map((p, i) => {
                const player = team1Players.find((e) => e.id === p)
                return (
                  <div
                    key={i}
                    className="text-xs md:text-base text-secondary-light justify-end items-center flex gap-2 md:gap-3"
                  >
                    <p>
                      {player
                        ? player.name
                        : team2Players.find((e) => e.id === p)?.name + ' (OG)'}
                    </p>
                    <img src={goal} className="h-3 md:h-5" alt="Goal" />
                  </div>
                )
              })}
            </div>
          </div>
          <p
            id="vs"
            className="flex text-white-3 px-1 md:px-2 text-lg md:text-xl"
          >
            -
          </p>
          <div
            id="team2Div"
            className="flex flex-col items-start gap-2 md:gap-3"
          >
            <div
              id="team2ScorelineDiv"
              className="flex gap-2 md:gap-3 items-center justify-center"
            >
              <p
                id="team2ActualScore"
                className="text-primary-normal text-xl md:text-3xl font-bold "
              >
                {team2ActualScore}
              </p>
              <p id="team2Name" className="text-white-1 text-base md:text-2xl">
                {resultMatch.awayTeam.name.split(' U-')[0]}
              </p>
              <img
                id="team2Flag"
                className="h-6 md:h-8"
                src={resultMatch.awayTeam.flagURL}
                alt="Team 2 flag"
              />
            </div>
            <div
              id="team2ScorersDiv"
              className="flex flex-col gap-1 md:gap-2 items-start"
            >
              {team2ActualScoringPlayers.map((p, i) => {
                const player = team2Players.find((e) => e.id === p)

                return (
                  <div
                    key={i}
                    className="text-xs md:text-base text-secondary-light justify-start items-center flex gap-2 md:gap-3"
                  >
                    <img src={goal} className="h-3 md:h-5" alt="Goal" />
                    <p>
                      {player
                        ? player.name
                        : team1Players.find((e) => e.id === p)?.name + ' (OG)'}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div
        id="predictionResultDiv"
        className="flex flex-col min-w-max gap-2 md:gap-3 items-start border-t-2 border-t-primary-normal py-3 md:py-4"
      >
        {userPrediction ? (
          <div
            id="userPredictionsDiv"
            className="w-full text-white-3 flex flex-col items-end gap-3 md:gap-4 px-3 md:px-4"
          >
            <p className="text-base w-full md:text-lg text-center text-primary-normal">
              Your Predictions
            </p>
            <div
              id="scorelinePredDiv"
              className="flex w-full -skew-x-[12deg] bg-black-3/70 gap-2 md:gap-3 rounded items-center justify-center border border-primary-normal p-2 md:p-3"
            >
              <div
                id="predictedScoreline"
                className="flex w-full skew-x-[12deg] items-center justify-center gap-2 md:gap-3 text-sm md:text-lg text-white-3"
              >
                <p>{resultMatch.homeTeam.name.split(' U-')[0]}</p>
                <p>{userPrediction.predictedScoreOfHomeTeam}</p>
                <img
                  src={whistle}
                  className="h-4 md:h-5"
                  alt="Final Whistle"
                ></img>
                <p>{userPrediction.predictedScoreOfAwayTeam}</p>
                <p>{resultMatch.awayTeam.name.split(' U-')[0]}</p>
              </div>
              <div
                id="ScorelinePoints"
                className={
                  `text-white-1 px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm rounded-full ` +
                  scorelineColor(userPrediction.scorelineMultiplier)
                }
              >
                {userPrediction.scorelineMultiplier}X
              </div>
            </div>
            <div
              id="goalscorersPredDiv"
              className="w-full -skew-x-[12deg] bg-black-3/70 flex items-center rounded justify-center border border-primary-normal p-2 md:p-3 gap-2 md:gap-3"
            >
              <div
                id="team1PredScorers"
                className="flex skew-x-[12deg] flex-col w-full items-end basis-1/2 gap-1 md:gap-2"
              >
                {userPrediction.predictedScoringPlayersOfHomeTeam.map(
                  (p, i) => {
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-1 text-xs md:text-sm text-white-3"
                      >
                        {team1Players.find((e) => e.id === p).name}
                        <img src={goal} className="h-3 md:h-5" alt="Goal" />
                      </div>
                    )
                  }
                )}
              </div>
              <img
                src={whistle}
                className="h-4 md:h-5 skew-x-[12deg]"
                alt="Final Whistle"
              ></img>
              <div
                id="team2PredScorers"
                className="flex flex-col skew-x-[12deg] w-full items-start basis-1/2 gap-1 md:gap-2"
              >
                {userPrediction.predictedScoringPlayersOfAwayTeam.map(
                  (p, i) => {
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-1 text-xs md:text-sm text-white-3"
                      >
                        <img src={goal} className="h-3 md:h-5" alt="Goal" />
                        {team2Players.find((e) => e.id === p).name}
                      </div>
                    )
                  }
                )}
              </div>
              <div
                id="goalscorerPoints"
                className={`text-white-1 px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm rounded-full ${
                  userPrediction.goalScorerMultiplier == 0
                    ? 'bg-red-dark'
                    : 'bg-secondary-dark'
                }`}
              >
                {userPrediction.goalScorerMultiplier}X
              </div>
            </div>
            <div className=" w-full flex gap-3 md:gap-4 justify-between items-center">
              <div className="flex text-base md:text-xl px-4 md:px-5 md:py-2.5 py-2 rounded bg-dark-3/70 gap-1 md:gap-2 text-white-3">
                <img src={dice} className="h-6 md:h-7" alt="Wagered coins" />
                <p>{userPrediction.wageredCoins}</p>
              </div>
              <div className="flex rounded-full px-3 py-1 md:px-4 md:py-1.5 bg-primary-dark text-base md:text-xl text-white-3">
                Earned points: {userPrediction.earnedPoints}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-red-light p-2 md:p-3 bg-dark-1/70 rounded text-center self-center text-sm md:text-base">
            You did not make any predictions for this match
          </p>
        )}
      </div>
    </div>
  )
}

const scorelineColor = (m: number) => {
  if (m == 3) {
    return 'bg-green-dark'
  } else if (m == 2) {
    return 'bg-primary-dark'
  } else if (m == 1) {
    return 'bg-black-1'
  } else {
    return 'bg-red-dark'
  }
}
