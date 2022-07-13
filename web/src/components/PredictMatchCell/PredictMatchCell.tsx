import type {
  FindPredictMatchQuery,
  FindPredictMatchQueryVariables,
} from 'types/graphql'
import { CellSuccessProps, useMutation } from '@redwoodjs/web'
import logo from 'public/Main 2.png'
import goal from 'public/goal.png'
import football from 'public/football.png'
import gloves from 'public/gloves.png'
import { navigate, Redirect, routes } from '@redwoodjs/router'
import moment from 'moment'
import { useAuth } from '@redwoodjs/auth'
import { useEffect, useState } from 'react'
import { PrimaryRoundedButton } from '../Buttons/RoundedButton/PrimaryRoundedButton'
import { SecondaryRoundedButtonSmall } from '../Buttons/RoundedButton/SecondaryRoundedButton'
import { toast } from '@redwoodjs/web/dist/toast'
import { RedRoundedButtonOutlined } from '../Buttons/RoundedButton/RedRoundedButton'

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
        predictedScoreOfTeam1
        predictedScoreOfTeam2
        predictedScoringPlayersOfTeam1
        predictedScoringPlayersOfTeam2
        wageredCoins
      }
      teams {
        id
        team {
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
  }
`

const CREATE_PREDICTION_MUTATION = gql`
  mutation CreatePredictionMutation($input: CreateMatchPredictionInput!) {
    createMatchPrediction(input: $input) {
      id
      userId
      matchId
      wageredCoins
      predictedScoreOfTeam1
      predictedScoreOfTeam2
      predictedScoringPlayersOfTeam1
      predictedScoringPlayersOfTeam2
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
      predictedScoreOfTeam1
      predictedScoreOfTeam2
      predictedScoringPlayersOfTeam1
      predictedScoringPlayersOfTeam2
    }
  }
`

const DELETE_PREDICTION_MUTATION = gql`
  mutation DeletePredictionMutation($id: Int!) {
    deleteMatchPrediction(id: $id) {
      id
      userId
      matchId
      wageredCoins
      predictedScoreOfTeam1
      predictedScoreOfTeam2
      predictedScoringPlayersOfTeam1
      predictedScoringPlayersOfTeam2
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
  const { currentUser } = useAuth()

  //Function to create Prediction
  const [createPrediction] = useMutation(CREATE_PREDICTION_MUTATION, {
    onCompleted: () => {
      toast.success('Prediction saved!')
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
      navigate(routes.home())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  //Find current user's prediciton for the match
  const userInitialPrediction = matchBeingPredicted.predictions.find(
    (p) => p.userId == currentUser.id
  )

  //Get already existing prediction data, if any
  const team1InitialScore = userInitialPrediction?.predictedScoreOfTeam1 ?? 0
  const team1InitialGoalScoringPlayers =
    userInitialPrediction?.predictedScoringPlayersOfTeam1 ?? []
  const team2InitialScore = userInitialPrediction?.predictedScoreOfTeam2 ?? 0
  const team2InitialGoalScoringPlayers =
    userInitialPrediction?.predictedScoringPlayersOfTeam2 ?? []
  const initialWageredCoins = userInitialPrediction?.wageredCoins

  //State variables for updating prediction data
  const [wageredCoins, setWageredCoins] = useState(initialWageredCoins ?? 10)
  const [team1PredictedScore, setTeam1PredictedScore] =
    useState(team1InitialScore)
  const [team1PredictedScoringPlayers, setTeam1PredictedScoringPlayers] =
    useState(team1InitialGoalScoringPlayers)
  const [team2PredictedScore, setTeam2PredictedScore] =
    useState(team2InitialScore)
  const [team2PredictedScoringPlayers, setTeam2PredictedScoringPlayers] =
    useState(team2InitialGoalScoringPlayers)

  //Cannot predict a match already played; Redirect to home
  useEffect(() => {
    if (moment(matchBeingPredicted.matchDate).isBefore(moment(currentDate))) {
      navigate(routes.home())
    }
  }, [matchBeingPredicted.matchDate])

  return (
    <div
      id="matchPredictionDiv"
      className="flex flex-col w-full overflow-y-scroll gap-2 md:gap-3 nonscroll"
    >
      <div
        id="infoDiv"
        className="flex px-2 md:px-3 py-2 md:py-3 gap-2 md:gap-3
       bg-tertiary-dark bg-opacity-80 rounded-md
      justify-between items-center w-full text-white-3 text-xs md:text-sm"
      >
        <div className="flex flex-col gap-1 md:gap-2">
          <p>{matchBeingPredicted.round}</p>
          <p>{matchBeingPredicted.location}</p>
        </div>
        <div className="flex flex-col gap-1 md:gap-2 items-end">
          <p>{moment(matchBeingPredicted.matchDate).format('HH:mm')}</p>
          <p>{moment(matchBeingPredicted.matchDate).format('DD MMM')}</p>
        </div>
      </div>
      <div
        id="teamsDiv"
        className="flex flex-col gap-1 md:gap-2 justify-start items-start"
      >
        <div
          id="team1Div"
          className="flex flex-col min-w-max -skew-x-[12deg] border-2 border-primary-normal rounded-md md:mr-12 ml-3 md:ml-4 px-3 md:px-4 py-2 md:py-3 bg-black-3 bg-opacity-70 gap-2 md:gap-3 items-start justify-start "
        >
          <div className="flex skew-x-[12deg] gap-3 md:gap-4 items-center justify-start">
            <div className="flex flex-col items-start gap-1 md:gap-2">
              <div className="flex gap-2 md:gap-3 items-center justify-start">
                <img
                  id="team1Flag"
                  className="h-4 md:h-5 aspect-video"
                  src={matchBeingPredicted.teams[0].team.flagURL}
                  alt="Team 1 flag"
                />
                <p
                  id="team1Name"
                  className="text-white-1 text-base md:text-lg whitespace-nowrap"
                >
                  {matchBeingPredicted.teams[0].team.name.split('U-')[0]}
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
              className="text-primary-normal text-3xl md:text-4xl font-bold border-black-3 border-l-2 pl-3 md:pl-4"
            >
              {team1PredictedScore}
            </p>
          </div>
        </div>
        <div id="team1ScorersDiv" className="self-start ml-2 md:ml-3">
          <GoalScorerPredictionForm
            teamPlayers={matchBeingPredicted.teams[0].team.players}
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
          className="flex flex-col min-w-max self-end -skew-x-[12deg] border-2 border-primary-normal rounded-md md:ml-12 mr-3 md:mr-4 px-3 md:px-4 py-2 md:py-3 bg-black-3 bg-opacity-70 gap-2 md:gap-3 items-end justify-start"
        >
          <div className="flex skew-x-[12deg] items-center justify-end gap-3 md:gap-4">
            <p
              id="team2PredictedScore"
              className="text-primary-normal text-3xl md:text-4xl font-bold border-black-3 border-r-2 pr-3 md:pr-4"
            >
              {team2PredictedScore}
            </p>
            <div className="flex flex-col items-end gap-1 md:gap-2">
              <div className="flex gap-2 md:gap-3 items-center justify-end">
                <p
                  id="team2Name"
                  className="text-white-1 text-base md:text-lg whitespace-nowrap"
                >
                  {matchBeingPredicted.teams[1].team.name.split('U-')[0]}
                </p>
                <img
                  id="team2Flag"
                  className="h-4 md:h-5 aspect-video"
                  src={matchBeingPredicted.teams[1].team.flagURL}
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
        <div id="team2ScorersDiv" className="self-end">
          <GoalScorerPredictionForm
            teamPlayers={matchBeingPredicted.teams[1].team.players}
            predictedScore={team2PredictedScore}
            predictedGoalScorers={team2PredictedScoringPlayers}
            setScorers={setTeam2PredictedScoringPlayers}
          />
        </div>
      </div>
      <div
        id="wagerDiv"
        className="flex px-2 md:px-3 py-2 md:py-3 gap-3 md:gap-4
        bg-black-3 bg-opacity-90 rounded-md
      justify-between items-center w-full text-white-3 text-xs md:text-sm"
      >
        <div className="flex gap-2 md:gap-3 justify-end items-center whitespace-nowrap">
          <p className="text-primary-normal text-lg md:text-xl">
            Wager coins:{' '}
          </p>
          <input
            className="text-secondary-dark w-20 placeholder:text-primary-light rounded-tl-lg rounded-br-lg px-1 md:px-2 py-1 bg-white-1 border-transparent border-4 focus:border-primary-normal text-base md:text-lg"
            name="wager"
            value={wageredCoins}
            onChange={(e) =>
              setWageredCoins(
                Math.min(
                  e.target.value == '' || e.target.value == '0' // Handle null and 0 values
                    ? 1
                    : parseInt(e.target.value),
                  matchBeingPredicted.maxWagerLimit,
                  currentUser.coins
                )
              )
            }
            inputMode="numeric"
          />
          <p className="text-red-light text-sm md:text-base">
            (Max: {matchBeingPredicted.maxWagerLimit})
          </p>
        </div>
        <p className="text-end text-xs md:text-sm text-secondary-light">
          (Predict goal scorers for bonus points)
        </p>
      </div>
      <div
        id="actionDiv"
        className="flex py-2 md:py-3 gap-3 md:gap-4 justify-between items-center w-full"
      >
        <PrimaryRoundedButton
          label={userInitialPrediction ? 'UPDATE' : 'SAVE'}
          onClick={() => {
            //A user prediction already exists? Update it; Else create a new one
            userInitialPrediction
              ? updatePrediction({
                  variables: {
                    id: userInitialPrediction.id,
                    input: {
                      wageredCoins: wageredCoins,
                      predictedScoreOfTeam1: team1PredictedScore,
                      predictedScoreOfTeam2: team2PredictedScore,
                      predictedScoringPlayersOfTeam1:
                        team1PredictedScoringPlayers,
                      predictedScoringPlayersOfTeam2:
                        team2PredictedScoringPlayers,
                    },
                  },
                })
              : createPrediction({
                  variables: {
                    input: {
                      userId: currentUser.id,
                      matchId: matchBeingPredicted.id,
                      wageredCoins: wageredCoins,
                      predictedScoreOfTeam1: team1PredictedScore,
                      predictedScoreOfTeam2: team2PredictedScore,
                      predictedScoringPlayersOfTeam1:
                        team1PredictedScoringPlayers,
                      predictedScoringPlayersOfTeam2:
                        team2PredictedScoringPlayers,
                    },
                  },
                })
          }}
        />
        {userInitialPrediction ? (
          <div className="flex text-white-3 text-xs md:text-sm items-center gap-2 md:gap-3">
            <p className="text-end">Not sure about this prediction?</p>
            <RedRoundedButtonOutlined
              label="DELETE"
              onClick={() => {
                //A user prediction already exists? Update it; Else create a new one
                deletePrediction({
                  variables: {
                    id: userInitialPrediction.id,
                  },
                })
              }}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
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
        'flex flex-row gap-1 md:gap-2 ' +
        (props.reversed ? 'flex-row-reverse' : '')
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
          className="h-6 md:h-8 hover:-translate-x-[1px] hover:-translate-y-[2px]"
          alt="Goal"
        />
      </button>
      <button
        onClick={() => {
          props.setGoals(1)
          props.setScorers(props.scorers.slice(0, 1))
        }}
      >
        <img
          src={props.goals > 0 ? goal : football}
          className="h-6 md:h-8 hover:-translate-x-[1px] hover:-translate-y-[2px]"
          alt="Goal"
        />
      </button>
      <button
        onClick={() => {
          props.setGoals(2)
          props.setScorers(props.scorers.slice(0, 2))
        }}
      >
        <img
          src={props.goals > 1 ? goal : football}
          className="h-6 md:h-8 hover:-translate-x-[1px] hover:-translate-y-[2px]"
          alt="Goal"
        />
      </button>
      <button
        onClick={() => {
          props.setGoals(3)
          props.setScorers(props.scorers.slice(0, 3))
        }}
      >
        <img
          src={props.goals > 2 ? goal : football}
          className="h-6 md:h-8 hover:-translate-x-[1px] hover:-translate-y-[2px]"
          alt="Goal"
        />
      </button>
      <button
        onClick={() => {
          props.setGoals(4)
          props.setScorers(props.scorers.slice(0, 4))
        }}
      >
        <img
          src={props.goals > 3 ? goal : football}
          className="h-6 md:h-8 hover:-translate-x-[1px] hover:-translate-y-[2px]"
          alt="Goal"
        />
      </button>
      <button
        onClick={() => {
          props.setGoals(5)
          props.setScorers(props.scorers.slice(0, 5))
        }}
      >
        <img
          src={props.goals > 4 ? goal : football}
          className="h-6 md:h-8 hover:-translate-x-[1px] hover:-translate-y-[2px]"
          alt="Goal"
        />
      </button>
      <button
        onClick={() => {
          props.setGoals(6)
          props.setScorers(props.scorers.slice(0, 6))
        }}
      >
        <img
          src={props.goals > 5 ? goal : football}
          className="h-6 md:h-8 hover:-translate-x-[1px] hover:-translate-y-[2px]"
          alt="Goal"
        />
      </button>
      <button
        onClick={() => {
          props.setGoals(7)
          props.setScorers(props.scorers.slice(0, 7))
        }}
      >
        <img
          src={props.goals > 6 ? goal : football}
          className="h-6 md:h-8 hover:-translate-x-[1px] hover:-translate-y-[2px]"
          alt="Goal"
        />
      </button>
      <button
        onClick={() => {
          props.setGoals(8)
          props.setScorers(props.scorers.slice(0, 8))
        }}
      >
        <img
          src={props.goals > 7 ? goal : football}
          className="h-6 md:h-8 hover:-translate-x-[1px] hover:-translate-y-[2px]"
          alt="Goal"
        />
      </button>
      <button
        onClick={() => {
          props.setGoals(9)
          props.setScorers(props.scorers.slice(0, 9))
        }}
      >
        <img
          src={props.goals > 8 ? goal : football}
          className="h-6 md:h-8 hidden md:flex hover:-translate-x-[1px] hover:-translate-y-[2px]"
          alt="Goal"
        />
      </button>
      <button
        onClick={() => {
          props.setGoals(10)
          props.setScorers(props.scorers.slice(0, 10))
        }}
      >
        <img
          src={props.goals > 9 ? goal : football}
          className="h-6 md:h-8 hidden md:flex hover:-translate-x-[1px] hover:-translate-y-[2px]"
          alt="Goal"
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
  console.log('Goal scorers:' + props.predictedGoalScorers)
  return (
    <div className="flex flex-col gap-1 md:gap-2 items-start">
      {props.predictedGoalScorers
        .slice(0, props.predictedScore)
        .map((scorer, i) => {
          const selectedPlayer = props.teamPlayers.find((p) => p.id == scorer)
          return (
            <div
              key={i}
              className="flex gap-1 md:gap-2 -skew-x-12 items-center"
            >
              <select
                className="rounded-md bg-white-3 border-secondary-normal text-secondary-normal text-xs md:text-sm p-2"
                value={`${selectedPlayer.position} | ${selectedPlayer.name}`}
                onChange={(e) => {
                  console.log(e.target.value)
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
                className="bg-red-normal text-white-3 text-xs md:text-sm py-1 px-2 rounded-md"
                onClick={() => {
                  props.setScorers([
                    ...props.predictedGoalScorers.slice(0, i),
                    ...props.predictedGoalScorers.slice(i + 1),
                  ])
                }}
              >
                x
              </button>
            </div>
          )
        })}
      {props.predictedScore > props.predictedGoalScorers.length ? (
        <SecondaryRoundedButtonSmall
          label="+ PREDICT GOAL SCORER"
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
