import type { AllUsersQuery } from 'types/graphql'
import type { CellSuccessProps } from '@redwoodjs/web'
import logo from 'public/Main 2.png'
import { useAuth } from '@redwoodjs/auth'

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
      id="AllTeamsDiv"
      className="flex flex-col w-full max-h-[80vh] px-2 md:px-3 py-2 md:py-3 gap-2 md:gap-3 bg-black-3 bg-opacity-60 rounded-md items-start justify-start"
    >
      <p className="text-light-3 text-xs md:text-sm font-bold">LEADERBOARD</p>
      <div className="flex text-white-3 px-4 md:px-5 py-2 gap-3 md:gap-4 items-center justify-center w-full">
        <p className="basis-1/6 text-start">Rank</p>
        <p className="basis-3/6 text-start">Username</p>
        <p className="basis-2/6 text-end">Points</p>
      </div>
      <div className="flex flex-col px-3 w-full h-full overflow-y-scroll gap-2 md:gap-3 justify-start items-start nonscroll">
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
        (props.user.id != currentUser.id
          ? 'bg-white-3 text-secondary-dark border-secondary-dark'
          : 'bg-black-1 text-primary-normal  border-primary-normal')
      }
    >
      <p className="basis-1/6 text-start">#{props.rank + 1}</p>
      <p className="basis-3/6 text-start">{props.user.username}</p>
      <p className="basis-2/6 text-end">{props.user.points}</p>
    </div>
  )
}
