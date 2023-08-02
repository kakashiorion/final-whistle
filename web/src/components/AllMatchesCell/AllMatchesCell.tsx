import { useState } from 'react'

import moment from 'moment'
import goal from 'public/goal.png'
import logo from 'public/Main 2.png'
import type { AllMatchesQuery } from 'types/graphql'

import { Redirect, routes } from '@redwoodjs/router'
import type { CellSuccessProps } from '@redwoodjs/web'

export const QUERY = gql`
  query AllMatchesQuery($tournamentId: Int!) {
    allMatches: tournament(id: $tournamentId) {
      id
      matches {
        id
        homeScore
        awayScore
        location
        matchDate
        round
        homeScoringPlayers
        homeTeam {
          id
          name
          color
          flagURL
          players {
            id
            name
          }
        }
        awayScoringPlayers
        awayTeam {
          id
          name
          color
          flagURL
          players {
            id
            name
          }
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

export const Success = ({ allMatches }: CellSuccessProps<AllMatchesQuery>) => {
  const [expandedIndex, setExpandedIndex] = useState(0)
  const matches = [...allMatches.matches].sort((a, b) =>
    moment(a.matchDate).isAfter(moment(b.matchDate)) ? -1 : 1
  )
  return (
    <div
      id="AllmatchesDiv"
      className="flex flex-col w-full h-full overflow-hidden p-2 md:p-3 gap-2 md:gap-3 bg-black-3/70 rounded items-start justify-start"
    >
      <p className="text-primary-normal text-lg md:text-2xl">All Matches</p>
      <div
        id="MatchesList"
        className="flex flex-col w-full h-full p-1 overflow-y-scroll gap-2 md:gap-3 justify-start items-start nonscroll"
      >
        {matches.map((match) => {
          return (
            <button
              key={match.id}
              id="resultDiv"
              onClick={() => {
                setExpandedIndex(expandedIndex == match.id ? 0 : match.id)
              }}
              className="flex flex-col w-full rounded p-3 md:p-4 bg-black-1/70 hover:bg-secondary-dark/70 gap-2 md:gap-3"
            >
              <div
                id="infoDiv"
                className="flex gap-1 md:gap-2 justify-between items-center w-full text-white-3 text-[10px] md:text-xs"
              >
                <div
                  id="matchInfo"
                  className="flex flex-col gap-1 md:gap-2 items-start"
                >
                  <p>{match.round}</p>
                  <p>{match.location.split(', ')[1]}</p>
                </div>
                <div
                  id="matchTime"
                  className="flex flex-col gap-1 md:gap-2 items-end"
                >
                  <p>{moment(match.matchDate).format('HH:mm')}</p>
                  <p>{moment(match.matchDate).format('DD MMM')}</p>
                </div>
              </div>
              <div
                id="scorelineDiv"
                className="flex w-full gap-2 md:gap-3 items-start justify-center"
              >
                <div
                  id="team1Div"
                  className="flex flex-col items-end gap-2 md:gap-3 basis-1/2"
                >
                  <div
                    id="team1ScorelineDiv"
                    className="flex gap-2 md:gap-3 items-center justify-center"
                  >
                    <img
                      id="team1Flag"
                      className="h-4 md:h-5"
                      src={match.homeTeam.flagURL}
                      alt="Team 1 flag"
                    />
                    <p
                      id="team1Name"
                      className="text-white-1 text-sm md:text-base"
                    >
                      {match.homeTeam.name.split(' U-')[0]}
                    </p>
                    {match.homeScore != null && (
                      <p
                        id="team1ActualScore"
                        className="text-primary-normal text-sm md:text-base font-bold"
                      >
                        {match.homeScore}
                      </p>
                    )}
                  </div>
                  {expandedIndex == match.id && (
                    <div
                      id="team1ScorersDiv"
                      className="flex flex-col gap-1 md:gap-2 items-end"
                    >
                      {match.homeScoringPlayers.map((p, i) => {
                        const player = match.homeTeam.players.find(
                          (e) => e.id === p
                        )
                        return (
                          <div
                            key={i}
                            className="text-xs md:text-sm text-secondary-light justify-end items-center flex gap-2 md:gap-3"
                          >
                            <p>
                              {player
                                ? player.name
                                : match.awayTeam.players.find((e) => e.id === p)
                                    ?.name + ' (OG)'}
                            </p>
                            <img src={goal} className="h-3 md:h-4" alt="Goal" />
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
                <p
                  id="vs"
                  className="flex text-white-3 px-1 md:px-2 text-sm md:text-base"
                >
                  -
                </p>
                <div
                  id="team2Div"
                  className="flex flex-col items-start gap-2 md:gap-3 basis-1/2"
                >
                  <div
                    id="team2ScorelineDiv"
                    className="flex gap-2 md:gap-3 items-center justify-center"
                  >
                    {match.awayScore != null && (
                      <p
                        id="team2ActualScore"
                        className="text-primary-normal text-sm md:text-base font-bold "
                      >
                        {match.awayScore}
                      </p>
                    )}
                    <p
                      id="team2Name"
                      className="text-white-1 text-sm md:text-base"
                    >
                      {match.awayTeam.name.split(' U-')[0]}
                    </p>
                    <img
                      id="team2Flag"
                      className="h-4 md:h-5"
                      src={match.awayTeam.flagURL}
                      alt="Team 2 flag"
                    />
                  </div>
                  {expandedIndex == match.id && (
                    <div
                      id="team2ScorersDiv"
                      className="flex flex-col gap-1 md:gap-2 items-start"
                    >
                      {match.awayScoringPlayers.map((p, i) => {
                        const player = match.awayTeam.players.find(
                          (e) => e.id === p
                        )

                        return (
                          <div
                            key={i}
                            className="text-xs md:text-sm text-secondary-light justify-start items-center flex gap-2 md:gap-3"
                          >
                            <img src={goal} className="h-3 md:h-4" alt="Goal" />
                            <p>
                              {player
                                ? player.name
                                : match.homeTeam.players.find((e) => e.id === p)
                                    ?.name + ' (OG)'}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
