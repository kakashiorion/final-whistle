import type {
  FindPredictMatchQuery,
  FindPredictMatchQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import logo from 'public/Main 2.png'
import goal from 'public/goal.png'
import football from 'public/football.png'
import gloves from 'public/gloves.png'
import { navigate, Redirect, routes } from '@redwoodjs/router'
import moment from 'moment'
import { useAuth } from '@redwoodjs/auth'
import { useEffect, useState } from 'react'
import { PrimaryRoundedButton } from '../Buttons/RoundedButton/PrimaryRoundedButton'

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
        wageredPoints
      }
      teams {
        id
        team {
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

export const Loading = () => (
  <div className="h-full w-full flex items-center justify-center">
    <img className="max-h-[25vh] animate-bounce" src={logo} alt="FW logo" />
  </div>
)

export const Empty = () => <Redirect to={routes.home()} />

export const Failure = ({
  error,
}: CellFailureProps<FindPredictMatchQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

const currentDate = new Date()

export const Success = ({
  matchBeingPredicted,
}: CellSuccessProps<FindPredictMatchQuery, FindPredictMatchQueryVariables>) => {
  const { currentUser } = useAuth()

  const userInitialPrediction = matchBeingPredicted.predictions.find(
    (p) => p.userId == currentUser.id
  )

  const team1InitialScore = userInitialPrediction?.predictedScoreOfTeam1 ?? 0
  const team1InitialGoalScoringPlayers =
    userInitialPrediction?.predictedScoringPlayersOfTeam1 ?? []

  const team2InitialScore = userInitialPrediction?.predictedScoreOfTeam2 ?? 0
  const team2InitialGoalScoringPlayers =
    userInitialPrediction?.predictedScoringPlayersOfTeam2 ?? []

  const initialWageredPoints = userInitialPrediction?.wageredPoints

  const [wageredPoints, setWageredPoints] = useState(initialWageredPoints ?? 10)

  const [team1PredictedScore, setTeam1PredictedScore] =
    useState(team1InitialScore)
  const [team1PredictedScoringPlayers, setTeam1PredictedScoringPlayers] =
    useState(team1InitialGoalScoringPlayers)
  const [team2PredictedScore, setTeam2PredictedScore] =
    useState(team2InitialScore)
  const [team2PredictedScoringPlayers, setTeam2PredictedScoringPlayers] =
    useState(team2InitialGoalScoringPlayers)

  useEffect(() => {
    if (moment(matchBeingPredicted.matchDate).isBefore(moment(currentDate))) {
      navigate(routes.home())
    }
  }, [matchBeingPredicted.matchDate])

  return (
    <div
      id="matchPredictionDiv"
      className="flex flex-col w-full gap-2 md:gap-3"
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
          className="flex flex-col min-w-max -skew-x-[12deg] border-2 border-primary-normal rounded-md md:mr-12 px-3 md:px-4 py-2 md:py-3 bg-black-3 bg-opacity-70 gap-2 md:gap-3 items-start justify-start "
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
        <div
          id="vs"
          className="flex w-full self-center justify-evenly items-center text-white-3 text-lg md:text-xl"
        >
          <p>vs</p>
        </div>
        <div
          id="team2Div"
          className="flex flex-col min-w-max self-end -skew-x-[12deg] border-2 border-primary-normal rounded-md md:ml-12 px-3 md:px-4 py-2 md:py-3 bg-black-3 bg-opacity-70 gap-2 md:gap-3 items-end justify-start"
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
              />
            </div>
          </div>
        </div>
      </div>
      <div
        id="wagerDiv"
        className="flex px-2 md:px-3 py-2 md:py-3 gap-2 md:gap-3
       bg-black-3 bg-opacity-90 rounded-md
      justify-between items-center w-full text-white-3 text-xs md:text-sm"
      >
        <div className="flex gap-2 md:gap-3 justify-end items-center">
          <p className="text-primary-normal text-lg md:text-xl">
            Wager points:{' '}
          </p>
          <input
            className="text-secondary-dark w-20 placeholder:text-primary-light rounded-tl-lg rounded-br-lg px-1 md:px-2 py-1 bg-white-1 border-transparent border-4 focus:border-primary-normal text-base md:text-lg"
            name="wager"
            value={wageredPoints}
            onChange={(e) =>
              setWageredPoints(
                Math.min(
                  e.target.value == '' || e.target.value == '0' // Handle null and 0 values
                    ? 1
                    : parseInt(e.target.value),
                  matchBeingPredicted.maxWagerLimit,
                  currentUser.points
                )
              )
            }
            inputMode="numeric"
          />
          <p className="text-red-light text-sm md:text-base">
            (Max: {matchBeingPredicted.maxWagerLimit})
          </p>
        </div>
        <PrimaryRoundedButton label={'SAVE'} />
      </div>
    </div>
  )
}

interface SelectGoalsProps {
  setGoals: (i: number) => void
  goals: number
  reversed: boolean
}
const SelectGoals = (props: SelectGoalsProps) => {
  return (
    <div
      className={
        'flex flex-row gap-1 md:gap-2 ' +
        (props.reversed ? 'flex-row-reverse' : '')
      }
    >
      <button onClick={() => props.setGoals(0)}>
        <img
          src={gloves}
          className="h-6 md:h-8 hover:-translate-x-[1px] hover:-translate-y-[2px]"
          alt="Goal"
        />
      </button>
      <button onClick={() => props.setGoals(1)}>
        <img
          src={props.goals > 0 ? goal : football}
          className="h-6 md:h-8 hover:-translate-x-[1px] hover:-translate-y-[2px]"
          alt="Goal"
        />
      </button>
      <button onClick={() => props.setGoals(2)}>
        <img
          src={props.goals > 1 ? goal : football}
          className="h-6 md:h-8 hover:-translate-x-[1px] hover:-translate-y-[2px]"
          alt="Goal"
        />
      </button>
      <button onClick={() => props.setGoals(3)}>
        <img
          src={props.goals > 2 ? goal : football}
          className="h-6 md:h-8 hover:-translate-x-[1px] hover:-translate-y-[2px]"
          alt="Goal"
        />
      </button>
      <button onClick={() => props.setGoals(4)}>
        <img
          src={props.goals > 3 ? goal : football}
          className="h-6 md:h-8 hover:-translate-x-[1px] hover:-translate-y-[2px]"
          alt="Goal"
        />
      </button>
      <button onClick={() => props.setGoals(5)}>
        <img
          src={props.goals > 4 ? goal : football}
          className="h-6 md:h-8 hover:-translate-x-[1px] hover:-translate-y-[2px]"
          alt="Goal"
        />
      </button>
      <button onClick={() => props.setGoals(6)}>
        <img
          src={props.goals > 5 ? goal : football}
          className="h-6 md:h-8 hover:-translate-x-[1px] hover:-translate-y-[2px]"
          alt="Goal"
        />
      </button>
      <button onClick={() => props.setGoals(7)}>
        <img
          src={props.goals > 6 ? goal : football}
          className="h-6 md:h-8 hover:-translate-x-[1px] hover:-translate-y-[2px]"
          alt="Goal"
        />
      </button>
      <button onClick={() => props.setGoals(8)}>
        <img
          src={props.goals > 7 ? goal : football}
          className="h-6 md:h-8 hover:-translate-x-[1px] hover:-translate-y-[2px]"
          alt="Goal"
        />
      </button>
      <button onClick={() => props.setGoals(9)}>
        <img
          src={props.goals > 8 ? goal : football}
          className="h-6 md:h-8 hidden md:flex hover:-translate-x-[1px] hover:-translate-y-[2px]"
          alt="Goal"
        />
      </button>
      <button onClick={() => props.setGoals(10)}>
        <img
          src={props.goals > 9 ? goal : football}
          className="h-6 md:h-8 hidden md:flex hover:-translate-x-[1px] hover:-translate-y-[2px]"
          alt="Goal"
        />
      </button>
    </div>
  )
}
