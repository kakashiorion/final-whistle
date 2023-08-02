import logo from 'public/Main 2.png'
import type { AllUsersQuery } from 'types/graphql'

import type { CellSuccessProps } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

export const QUERY = gql`
  query AllUsersQuery {
    allUsers: users {
      id
      username
      points
    }
  }
`

export const Loading = () => (
  <div className="h-full w-full flex items-center justify-center">
    <img className="max-h-[25vh] animate-bounce" src={logo} alt="FW logo" />
  </div>
)
export const Empty = () => <div>No tournament is currently active!</div>

export const Success = ({ allUsers }: CellSuccessProps<AllUsersQuery>) => {
  const topUsers = allUsers.slice().sort((a, b) => b.points - a.points)

  return (
    <div
      id="LeaderboardDiv"
      className="flex flex-col w-full h-full overflow-hidden p-2 md:p-3 gap-3 bg-black-3/70 rounded-md items-start justify-start"
    >
      <p className="text-primary-normal px-3 md:px-4 text-lg md:text-2xl">
        Leaderboard
      </p>
      <div className="flex text-white-3 px-3 md:px-4 gap-3 md:gap-4 items-center justify-center w-full text-sm md:text-base">
        <p className="basis-1/6 text-start">Rank</p>
        <p className="basis-3/6 text-start">Username</p>
        <p className="basis-2/6 text-end">Points</p>
      </div>
      <div className="flex flex-col px-3 py-1 w-full h-full overflow-y-scroll gap-2 md:gap-3 justify-start items-start nonscroll">
        {topUsers.map((user, i) => {
          return <UserItem user={user} key={user.id} rank={i} />
        })}
      </div>
    </div>
  )
}

interface UserItemProps {
  user: {
    __typename?: 'User'
    id: number
    username?: string
    points?: number
  }
  rank: number
}

const UserItem = (props: UserItemProps) => {
  const { currentUser } = useAuth()
  return (
    <div
      className={
        `flex -skew-x-[12deg] border-2 px-2 md:px-3 py-2 gap-3 md:gap-4 items-center justify-center w-full ` +
        (props.user.id == currentUser.id
          ? 'bg-white-3 text-secondary-normal border-secondary-normal shadow-md shadow-secondary-normal'
          : 'bg-black-1 text-primary-normal border-primary-normal shadow-sm shadow-primary-normal')
      }
    >
      <p className="basis-1/6 text-start">#{props.rank + 1}</p>
      <p className="basis-3/6 text-start">{props.user.username}</p>
      <p className="basis-2/6 text-end">{props.user.points}</p>
    </div>
  )
}
