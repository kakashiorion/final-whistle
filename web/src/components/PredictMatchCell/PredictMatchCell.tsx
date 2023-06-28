import { useEffect, useState } from 'react'

import moment from 'moment'
import coin from 'public/coin.png'
import dice from 'public/diceBet.png'
import gloves from 'public/gloves.png'
import goal from 'public/goal.png'
import logo from 'public/Main 2.png'
import type {
  FindPredictMatchQuery,
  FindPredictMatchQueryVariables,
} from 'types/graphql'

import { back, navigate, Redirect, routes } from '@redwoodjs/router'
import { CellSuccessProps, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'
import {
  WagerTextInputErrorClassName,
  WagerTextInputFieldClassName,
} from 'src/utils'

import { PrimarySkewedButton } from '../Buttons/SkewedButton/PrimarySkewedButton'
import {
  SecondarySkewedButton,
  SmallSecondarySkewedButton,
} from '../Buttons/SkewedButton/SecondarySkewedButton'

//Initial query to get all prediction data for the match
export const QUERY = gql`
  query FindPredictMatchQuery($id: Int!) {
    matchBeingPredicted: match(id: $id) {
      id
      matchDate
      location
      round
      maxWagerLimit
      predictions {
        id
        userId
        predictedScoreOfHomeTeam
        predictedScoreOfAwayTeam
        predictedScoringPlayersOfHomeTeam
        predictedScoringPlayersOfAwayTeam
        wageredCoins
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

const CREATE_PREDICTION_MUTATION = gql`
  mutation CreatePredictionMutation($input: CreateMatchPredictionInput!) {
    createMatchPrediction(input: $input) {
      id
      userId
      matchId
      wageredCoins
      predictedScoreOfHomeTeam
      predictedScoreOfAwayTeam
      predictedScoringPlayersOfHomeTeam
      predictedScoringPlayersOfAwayTeam
    }
  }
`

const UPDATE_PREDICTION_MUTATION = gql`
  mutation UpdatePredictionMutation(
    $id: Int!
    $input: UpdateMatchPredictionInput!
  ) {
    updateMatchPrediction(id: $id, input: $input) {
      id
      userId
      matchId
      wageredCoins
      predictedScoreOfHomeTeam
      predictedScoreOfAwayTeam
      predictedScoringPlayersOfHomeTeam
      predictedScoringPlayersOfAwayTeam
    }
  }
`

const DELETE_PREDICTION_MUTATION = gql`
  mutation DeletePredictionMutation($id: Int!) {
    deleteMatchPrediction(id: $id) {
      id
    }
  }
`

const UPDATE_USER_COINS_MUTATION = gql`
  mutation UpdateUserCoinsMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      coins
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
  matchBeingPredicted,
}: CellSuccessProps<FindPredictMatchQuery, FindPredictMatchQueryVariables>) => {
  const { currentUser, reauthenticate } = useAuth()

  //Function to update user coins
  const [updateUserCoins] = useMutation(UPDATE_USER_COINS_MUTATION, {
    onError: (error) => {
      toast.error(error.message)
    },
  })

  //Function to create Prediction
  const [createPrediction] = useMutation(CREATE_PREDICTION_MUTATION, {
    onCompleted: () => {
      toast.success('Prediction saved!')
      reauthenticate()
      navigate(routes.home())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  //Function to update Prediction
  const [updatePrediction] = useMutation(UPDATE_PREDICTION_MUTATION, {
    onCompleted: () => {
      toast.success('Prediction updated!')
      reauthenticate()
      navigate(routes.home())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  //Function to delete Prediction
  const [deletePrediction] = useMutation(DELETE_PREDICTION_MUTATION, {
    onCompleted: () => {
      toast.success('Prediction deleted!')
      reauthenticate()
      navigate(routes.home())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  //Find current user's prediction for the match
  const userInitialPrediction = matchBeingPredicted.predictions.find(
    (p) => p.userId == currentUser.id
  )

  //Get already existing prediction data, if any
  const homeTeamInitialScore =
    userInitialPrediction?.predictedScoreOfHomeTeam ?? 0
  const homeTeamInitialGoalScoringPlayers =
    userInitialPrediction?.predictedScoringPlayersOfHomeTeam ?? []
  const awayTeamInitialScore =
    userInitialPrediction?.predictedScoreOfAwayTeam ?? 0
  const awayTeamInitialGoalScoringPlayers =
    userInitialPrediction?.predictedScoringPlayersOfAwayTeam ?? []
  const initialWageredCoins = userInitialPrediction?.wageredCoins ?? 0

  //State variables for updating prediction data
  const [wageredCoins, setWageredCoins] = useState(initialWageredCoins)
  const [wagerErrorMsg, setWagerErrorMsg] = useState('')
  const [team1PredictedScore, setTeam1PredictedScore] =
    useState(homeTeamInitialScore)
  const [team1PredictedScoringPlayers, setTeam1PredictedScoringPlayers] =
    useState(homeTeamInitialGoalScoringPlayers)
  const [team2PredictedScore, setTeam2PredictedScore] =
    useState(awayTeamInitialScore)
  const [team2PredictedScoringPlayers, setTeam2PredictedScoringPlayers] =
    useState(awayTeamInitialGoalScoringPlayers)

  //Cannot predict a match already played; Redirect to home
  useEffect(() => {
    if (moment(matchBeingPredicted.matchDate).isBefore(moment(currentDate))) {
      navigate(routes.home())
    }
  }, [matchBeingPredicted.matchDate])

  return (
    <div
      id="matchPredictionDiv"
      className="flex flex-col w-full overflow-y-scroll gap-4 md:gap-5 nonscroll"
    >
      <div id="HeaderDiv" className="flex gap-2 md:gap-3 justify-between">
        <p id="Header" className="text-lg md:text-2xl text-primary-normal ">
          Match Prediction
        </p>
        <p
          id="predictionsLength"
          className="py-1 md:py-1.5 rounded-full whitespace-nowrap px-3 md:px-4 bg-secondary-light flex justify-center items-center text-black-2 text-[10px] md:text-xs"
        >
          {matchBeingPredicted.predictions.length}
        </p>
      </div>
      <div
        id="infoDiv"
        className="flex p-2 md:p-3 gap-2 md:gap-3
       bg-dark-2/70 rounded
      justify-between items-center w-full text-white-4 text-sm md:text-base"
      >
        <div
          id="matchInfo"
          className="flex flex-col gap-1 md:gap-2 items-start"
        >
          <p>{matchBeingPredicted.round}</p>
          <p>{matchBeingPredicted.location}</p>
        </div>
        <div id="matchTime" className="flex flex-col gap-1 md:gap-2 items-end">
          <p>{moment(matchBeingPredicted.matchDate).format('HH:mm')}</p>
          <p>{moment(matchBeingPredicted.matchDate).format('DD MMM')}</p>
        </div>
      </div>
      <div
        id="teamsDiv"
        className="flex flex-col gap-3 md:gap-4 justify-start items-start"
      >
        <div
          id="team1Div"
          className="flex min-w-max -skew-x-[12deg] border-2 border-primary-normal rounded md:mr-12 ml-3 md:ml-4 p-3 md:p-4 bg-black-3/70"
        >
          <div
            id="team1Box"
            className="flex skew-x-[12deg] gap-1 md:gap-4 items-start justify-start"
          >
            <div
              id="team1Meta"
              className="flex flex-col items-start gap-3 md:gap-4"
            >
              <div
                id="team1Info"
                className="flex gap-2 md:gap-3 items-center justify-start"
              >
                <img
                  id="team1Flag"
                  className="h-7 md:h-8"
                  src={matchBeingPredicted.homeTeam.flagURL}
                  alt="Team 1 flag"
                />
                <p
                  id="team1Name"
                  className="text-white-1 text-lg md:text-2xl whitespace-nowrap"
                >
                  {matchBeingPredicted.homeTeam.name.split(' U-')[0]}
                </p>
              </div>
              <SelectGoals
                setGoals={setTeam1PredictedScore}
                goals={team1PredictedScore}
                reversed={false}
                scorers={team1PredictedScoringPlayers}
                setScorers={setTeam1PredictedScoringPlayers}
              />
            </div>
            <p
              id="team1PredictedScore"
              className="text-primary-normal text-3xl md:text-4xl font-bold"
            >
              {team1PredictedScore}
            </p>
          </div>
        </div>
        <div id="team1ScorersDiv" className="self-start ml-2 md:ml-3">
          <GoalScorerPredictionForm
            teamPlayers={matchBeingPredicted.homeTeam.players}
            predictedScore={team1PredictedScore}
            predictedGoalScorers={team1PredictedScoringPlayers}
            setScorers={setTeam1PredictedScoringPlayers}
          />
        </div>
        <div
          id="vs"
          className="flex w-full self-center justify-evenly items-center text-white-3 text-lg md:text-xl"
        >
          <p>vs</p>
        </div>
        <div
          id="team2Div"
          className="flex min-w-max self-end -skew-x-[12deg] border-2 border-primary-normal rounded md:ml-12 mr-3 md:mr-4 p-3 md:p-4 bg-black-3/70"
        >
          <div
            id="team2Box"
            className="flex skew-x-[12deg] items-start justify-end gap-1 md:gap-4"
          >
            <p
              id="team2PredictedScore"
              className="text-primary-normal text-3xl md:text-4xl font-bold"
            >
              {team2PredictedScore}
            </p>
            <div
              id="team2Meta"
              className="flex flex-col items-end gap-3 md:gap-4"
            >
              <div
                id="team2Info"
                className="flex gap-2 md:gap-3 items-center justify-end"
              >
                <p
                  id="team2Name"
                  className="text-white-1 text-lg md:text-2xl whitespace-nowrap"
                >
                  {matchBeingPredicted.awayTeam.name.split(' U-')[0]}
                </p>
                <img
                  id="team2Flag"
                  className="h-7 md:h-8"
                  src={matchBeingPredicted.awayTeam.flagURL}
                  alt="Team 2 flag"
                />
              </div>
              <SelectGoals
                setGoals={setTeam2PredictedScore}
                goals={team2PredictedScore}
                reversed={true}
                scorers={team2PredictedScoringPlayers}
                setScorers={setTeam2PredictedScoringPlayers}
              />
            </div>
          </div>
        </div>
        <div id="team2ScorersDiv" className="self-end mr-2 md:mr-3">
          <GoalScorerPredictionForm
            teamPlayers={matchBeingPredicted.awayTeam.players}
            predictedScore={team2PredictedScore}
            predictedGoalScorers={team2PredictedScoringPlayers}
            setScorers={setTeam2PredictedScoringPlayers}
          />
        </div>
      </div>
      <div
        id="wagerContainer"
        className="flex flex-col px-2 md:px-3 py-2 md:py-3 gap-3 md:gap-4
         border-t-2 border-t-primary-normal
      justify-center items-center w-full text-white-3 text-xs md:text-sm"
      >
        <p className="text-primary-normal text-base md:text-xl">
          Place your wager
        </p>
        <div
          id="wagerInputDiv"
          className="flex w-full gap-2 md:gap-3 justify-center items-center"
        >
          <img src={dice} className="h-11 md:h-14" alt="Dice 1" />

          <input
            className={
              wagerErrorMsg
                ? WagerTextInputErrorClassName
                : WagerTextInputFieldClassName
            }
            name="wager"
            inputMode="numeric"
            value={wageredCoins}
            onChange={(e) => {
              const v = Number(e.target.value)
              if (v >= 0) {
                setWageredCoins(v)
                setWagerErrorMsg('')
              }
            }}
          />
          <img src={dice} className="h-11 md:h-14" alt="Dice 2" />
        </div>
        <div
          id="wagerInfoDiv"
          className="flex w-full gap-2 md:gap-3 justify-center items-center"
        >
          <p className="text-white-3 text-sm md:text-base">
            {matchBeingPredicted.maxWagerLimit == 0
              ? '(No Round Limit)'
              : `(Round Limit: ${matchBeingPredicted.maxWagerLimit})`}
          </p>
        </div>
        <div
          id="UserCoinsDiv"
          className="flex gap-2 md:gap-3 bg-dark-2/70 rounded px-4 md:px-5 md:py-2.5 py-2 justify-center items-center"
        >
          <p className="text-sm md:text-base text-primary-normal">
            You have: {currentUser.coins}
          </p>
          <img src={coin} className="h-5 md:h-6" alt="Wager coins" />
        </div>
        <p className="text-red-normal text-center text-sm md:text-base">
          {wagerErrorMsg}
        </p>
      </div>
      <div
        id="actionDiv"
        className="flex px-4 md:px-5 py-2 md:py-3 gap-2 md:gap-3 justify-center items-center w-full"
      >
        <SecondarySkewedButton label="<" onClick={() => back()} />
        <PrimarySkewedButton
          label={
            userInitialPrediction ? 'UPDATE PREDICTION' : 'SAVE PREDICTION'
          }
          onClick={() => {
            if (wageredCoins <= 0) {
              setWagerErrorMsg('Enter a valid wager')
            } else if (
              wageredCoins > matchBeingPredicted.maxWagerLimit &&
              matchBeingPredicted.maxWagerLimit > 0
            ) {
              setWagerErrorMsg('Round wager limit exceeded')
            } else if (wageredCoins > currentUser.coins + initialWageredCoins) {
              setWagerErrorMsg('Not enough coins')
            } else {
              //A user prediction already exists? Update it; Else create a new one
              userInitialPrediction
                ? updatePrediction({
                    variables: {
                      id: userInitialPrediction.id,
                      input: {
                        wageredCoins: wageredCoins,
                        predictedScoreOfHomeTeam: team1PredictedScore,
                        predictedScoreOfAwayTeam: team2PredictedScore,
                        predictedScoringPlayersOfHomeTeam:
                          team1PredictedScoringPlayers,
                        predictedScoringPlayersOfAwayTeam:
                          team2PredictedScoringPlayers,
                      },
                    },
                  }) &&
                  updateUserCoins({
                    variables: {
                      id: currentUser.id,
                      input: {
                        coins:
                          currentUser.coins +
                          initialWageredCoins -
                          wageredCoins,
                      },
                    },
                  })
                : createPrediction({
                    variables: {
                      input: {
                        userId: currentUser.id,
                        matchId: matchBeingPredicted.id,
                        wageredCoins: wageredCoins,
                        predictedScoreOfHomeTeam: team1PredictedScore,
                        predictedScoreOfAwayTeam: team2PredictedScore,
                        predictedScoringPlayersOfHomeTeam:
                          team1PredictedScoringPlayers,
                        predictedScoringPlayersOfAwayTeam:
                          team2PredictedScoringPlayers,
                      },
                    },
                  }) &&
                  updateUserCoins({
                    variables: {
                      id: currentUser.id,
                      input: {
                        coins: currentUser.coins - wageredCoins,
                      },
                    },
                  })
            }
          }}
        />
      </div>
      {userInitialPrediction && (
        <button
          className="hover:text-red-light text-white-4 hover:underline text-xs md:text-sm"
          onClick={() => {
            //A user prediction already exists? Update it; Else create a new one
            deletePrediction({
              variables: {
                id: userInitialPrediction.id,
              },
            }) &&
              updateUserCoins({
                variables: {
                  id: currentUser.id,
                  input: {
                    coins: currentUser.coins + initialWageredCoins,
                  },
                },
              })
          }}
        >
          REMOVE PREDICTION
        </button>
      )}
      {/* </div> */}
    </div>
  )
}

interface SelectGoalsProps {
  setGoals: (i: number) => void
  goals: number
  reversed: boolean
  setScorers: (e: number[]) => void
  scorers: number[]
}
const SelectGoals = (props: SelectGoalsProps) => {
  return (
    <div
      className={
        'flex flex-row gap-2 ' + (props.reversed ? 'flex-row-reverse' : '')
      }
    >
      <button
        onClick={() => {
          props.setGoals(0)
          props.setScorers([])
        }}
      >
        <img
          src={gloves}
          className={`h-6 md:h-8 hover:-translate-x-[1px] hover:-translate-y-[2px] ${
            props.goals > 0 ? 'opacity-20' : ''
          }`}
          alt="0 Goal"
        />
      </button>
      <button
        onClick={() => {
          props.setGoals(1)
          props.setScorers(props.scorers.slice(0, 1))
        }}
      >
        <img
          src={goal}
          className={`h-6 md:h-8 hover:-translate-x-[1px] hover:-translate-y-[2px] ${
            props.goals < 1 ? 'opacity-20' : ''
          }`}
          alt="1 Goal"
        />
      </button>
      <button
        onClick={() => {
          props.setGoals(2)
          props.setScorers(props.scorers.slice(0, 2))
        }}
      >
        <img
          src={goal}
          className={`h-6 md:h-8 hover:-translate-x-[1px] hover:-translate-y-[2px] ${
            props.goals < 2 ? 'opacity-20' : ''
          }`}
          alt="2 Goal"
        />
      </button>
      <button
        onClick={() => {
          props.setGoals(3)
          props.setScorers(props.scorers.slice(0, 3))
        }}
      >
        <img
          src={goal}
          className={`h-6 md:h-8 hover:-translate-x-[1px] hover:-translate-y-[2px] ${
            props.goals < 3 ? 'opacity-20' : ''
          }`}
          alt="3 Goal"
        />
      </button>
      <button
        onClick={() => {
          props.setGoals(4)
          props.setScorers(props.scorers.slice(0, 4))
        }}
      >
        <img
          src={goal}
          className={`h-6 md:h-8 hover:-translate-x-[1px] hover:-translate-y-[2px] ${
            props.goals < 4 ? 'opacity-20' : ''
          }`}
          alt="4 Goal"
        />
      </button>
      <button
        onClick={() => {
          props.setGoals(5)
          props.setScorers(props.scorers.slice(0, 5))
        }}
      >
        <img
          src={goal}
          className={`h-6 md:h-8 hover:-translate-x-[1px] hover:-translate-y-[2px] ${
            props.goals < 5 ? 'opacity-20' : ''
          }`}
          alt="5 Goal"
        />
      </button>
      <button
        onClick={() => {
          props.setGoals(6)
          props.setScorers(props.scorers.slice(0, 6))
        }}
      >
        <img
          src={goal}
          className={`h-6 md:h-8 hover:-translate-x-[1px] hover:-translate-y-[2px] ${
            props.goals < 6 ? 'opacity-20' : ''
          }`}
          alt="6 Goal"
        />
      </button>
      <button
        onClick={() => {
          props.setGoals(7)
          props.setScorers(props.scorers.slice(0, 7))
        }}
      >
        <img
          src={goal}
          className={`h-6 md:h-8 hover:-translate-x-[1px] hover:-translate-y-[2px] ${
            props.goals < 7 ? 'opacity-20' : ''
          }`}
          alt="7 Goal"
        />
      </button>
      <button
        onClick={() => {
          props.setGoals(8)
          props.setScorers(props.scorers.slice(0, 8))
        }}
      >
        <img
          src={goal}
          className={`h-6 md:h-8 hidden md:flex hover:-translate-x-[1px] hover:-translate-y-[2px] ${
            props.goals < 8 ? 'opacity-20' : ''
          }`}
          alt="8 Goal"
        />
      </button>
      <button
        onClick={() => {
          props.setGoals(9)
          props.setScorers(props.scorers.slice(0, 9))
        }}
      >
        <img
          src={goal}
          className={`h-6 md:h-8 hidden md:flex hover:-translate-x-[1px] hover:-translate-y-[2px] ${
            props.goals < 9 ? 'opacity-20' : ''
          }`}
          alt="9 Goal"
        />
      </button>
    </div>
  )
}

interface GoalScorerPredictionFormProps {
  predictedScore: number
  predictedGoalScorers: number[]
  teamPlayers: {
    id: number
    name: string
    position: string
  }[]
  setScorers: (i: number[]) => void
}

const GoalScorerPredictionForm = (props: GoalScorerPredictionFormProps) => {
  return (
    <div
      id="GoalScorerForm"
      className="flex flex-col gap-2 md:gap-3 items-start w-full"
    >
      {props.predictedGoalScorers
        .slice(0, props.predictedScore)
        .map((scorer, i) => {
          const selectedPlayer = props.teamPlayers.find((p) => p.id == scorer)
          return (
            <div
              id="ScorerItemLine"
              key={i}
              className="flex gap-2 md:gap-3 -skew-x-12 items-center w-full"
            >
              <select
                className="rounded bg-white-1 border-secondary-normal text-secondary-normal text-xs md:text-sm p-2 md:p-3"
                value={`${selectedPlayer.position} | ${selectedPlayer.name}`}
                onChange={(e) => {
                  props.setScorers([
                    ...props.predictedGoalScorers.slice(0, i),
                    props.teamPlayers.find(
                      (p) => p.name == e.target.value.split(' | ')[1]
                    ).id,
                    ...props.predictedGoalScorers.slice(i + 1),
                  ])
                }}
              >
                {props.teamPlayers.map((p) => (
                  <option className="skew-x-12" key={p.id}>
                    {p.position} | {p.name}
                  </option>
                ))}
              </select>
              <button
                id="removeGoalScorer"
                className="bg-red-normal text-white-3 text-xs md:text-sm py-1 md:py-1.5 px-2 md:px-3 rounded"
                onClick={() => {
                  props.setScorers([
                    ...props.predictedGoalScorers.slice(0, i),
                    ...props.predictedGoalScorers.slice(i + 1),
                  ])
                }}
              >
                X
              </button>
            </div>
          )
        })}
      {props.predictedScore > props.predictedGoalScorers.length ? (
        <SmallSecondarySkewedButton
          label="+ PREDICT GOAL SCORERS"
          onClick={() =>
            props.setScorers([
              ...props.predictedGoalScorers,
              props.teamPlayers[0].id,
            ])
          }
        />
      ) : (
        <></>
      )}
    </div>
  )
}
