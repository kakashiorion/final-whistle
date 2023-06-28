import coin from 'public/coin.png'
import logo from 'public/Main 2.png'
import type {
  FindCurrentUserQuery,
  FindCurrentUserQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindCurrentUserQuery($id: Int!) {
    currentUser: user(id: $id) {
      id
      username
      email
      points
      coins
      predictions {
        id
        wageredCoins
        earnedPoints
        scorelineMultiplier
        goalScorerMultiplier
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
  currentUser,
}: CellSuccessProps<FindCurrentUserQuery, FindCurrentUserQueryVariables>) => {
  const totalPredictions = currentUser.predictions.length
  const correctScorelinePredictions = currentUser.predictions.filter(
    (p) => p.scorelineMultiplier == 3
  ).length
  const correctGoalDifferencePredictions = currentUser.predictions.filter(
    (p) => p.scorelineMultiplier == 2
  ).length
  const correctResultPredictions = currentUser.predictions.filter(
    (p) => p.scorelineMultiplier == 1
  ).length
  const correctGoalScorerPredictions = currentUser.predictions.reduce(
    (a, b) => a + b.goalScorerMultiplier,
    0
  )

  return (
    <div
      id="UserProfileDiv"
      className="flex flex-col w-full gap-3 md:gap-4 items-start justify-start overflow-y-scroll"
    >
      <p
        id="Header"
        className="text-primary-normal px-3 md:px-4 text-lg md:text-2xl"
      >
        User Profile
      </p>
      <div
        id="UserInfo"
        className="flex flex-col text-white-3 px-3 md:px-4 gap-3 md:gap-4 items-center justify-center w-full text-sm md:text-base"
      >
        <div
          id="Username"
          className="w-full p-2 md:p-3 bg-dark-3 rounded flex flex-col items-center gap-1 md:gap-2"
        >
          <p className="text-secondary-normal text-xl md:text-3xl">
            {currentUser.username}
          </p>
          <p className="text-white-3 text-sm md:text-base">
            {currentUser.email}
          </p>
        </div>
        <div
          id="UserResources"
          className="w-full p-3 md:p-4 bg-black-3/70 rounded flex justify-between items-center gap-1 md:gap-2"
        >
          <p className="text-base md:text-lg text-white-3">
            Earned points: {currentUser.points}
          </p>
          <div
            id="Coins"
            className="flex gap-2 md:gap-3 justify-center items-center"
          >
            <p className="text-base md:text-lg text-primary-normal">
              {currentUser.coins}
            </p>
            <img src={coin} className="h-5 md:h-6" alt="Wager coins" />
          </div>
        </div>
      </div>
      <div
        id="UserData"
        className="flex flex-col gap-2 md:gap-3 p-3 md:p-4 border-t-2 border-t-primary-normal w-full text-white-3 text-base md:text-lg "
      >
        <p className="text-primary-normal text-base md:text-lg">
          Your prediction stats
        </p>
        <div className="flex w-full justify-between items-center -skew-x-[12deg] border-2 border-primary-normal rounded p-3 md:p-4 bg-black-3/70">
          <p>Total predictions</p>
          <p>{totalPredictions}</p>
        </div>
        <div className="flex w-full justify-between items-center -skew-x-[12deg] border-2 border-primary-normal rounded p-3 md:p-4 bg-black-3/70">
          <p>Correct scoreline (3X)</p>
          <p>{correctScorelinePredictions}</p>
        </div>
        <div className="flex w-full justify-between items-center -skew-x-[12deg] border-2 border-primary-normal rounded p-3 md:p-4 bg-black-3/70">
          <p>Correct goal difference (2X)</p>
          <p>{correctGoalDifferencePredictions}</p>
        </div>
        <div className="flex w-full justify-between items-center -skew-x-[12deg] border-2 border-primary-normal rounded p-3 md:p-4 bg-black-3/70">
          <p>Correct match result (1X)</p>
          <p>{correctResultPredictions}</p>
        </div>
        <div className="flex w-full justify-between items-center -skew-x-[12deg] border-2 border-primary-normal rounded p-3 md:p-4 bg-black-3/70">
          <p>Goalscorers (bonus)</p>
          <p>{correctGoalScorerPredictions}</p>
        </div>
      </div>
    </div>
  )
}
