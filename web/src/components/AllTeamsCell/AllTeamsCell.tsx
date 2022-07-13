import type { AllTeamsQuery } from 'types/graphql'
import type { CellSuccessProps } from '@redwoodjs/web'
import logo from 'public/Main 2.png'
import { useState } from 'react'

export const QUERY = gql`
  query AllTeamsQuery {
    allTeams: teams {
      id
      name
      color
      flagURL
      players {
        id
        name
        position
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

export const Success = ({ allTeams }: CellSuccessProps<AllTeamsQuery>) => {
  const [expandedIndex, setExpandedIndex] = useState(0)
  return (
    <div
      id="AllTeamsDiv"
      className="flex flex-col w-full max-h-[80vh] px-2 md:px-3 py-2 md:py-3 gap-2 md:gap-3 bg-black-3 bg-opacity-60 rounded-md items-start justify-start"
    >
      <p className="text-light-3 text-xs md:text-sm font-bold">ALL TEAMS</p>
      <div className="flex flex-col w-full h-full overflow-y-scroll gap-2 md:gap-3 justify-start items-start nonscroll">
        {allTeams.map((team) => {
          return (
            <TeamItem
              team={team}
              key={team.id}
              expandedIndex={expandedIndex}
              setExpandedIndex={setExpandedIndex}
            />
          )
        })}
      </div>
    </div>
  )
}

interface TeamItemProps {
  expandedIndex: number
  setExpandedIndex: (index: number) => void
  team: {
    __typename?: 'Team'
    id: number
    name: string
    color?: string
    flagURL?: string
    players: {
      __typename?: 'Player'
      id: number
      name: string
      position: string
    }[]
  }
}
const TeamItem = (props: TeamItemProps) => {
  return (
    <button
      onClick={() => {
        props.setExpandedIndex(
          props.expandedIndex == props.team.id ? 0 : props.team.id
        )
      }}
      className="w-full rounded-sm flex-col text-secondary-dark text-sm md:text-base hover:text-white-3 hover:-translate-y-1 hover:-translate-x-1 hover:bg-secondary-dark hover:bg-opacity-60 flex gap-1 md:gap-2 items-center justify-evenly bg-white-3 px-1 md:px-2 py-2 md:py-3"
    >
      <div className="w-full flex gap-2 md:gap-3 items-center">
        <img
          className="h-3 md:h-4 aspect-video"
          src={props.team.flagURL}
          alt="team flag"
        />{' '}
        <p>{props.team.name.split('U-')[0]}</p>
      </div>
      {props.expandedIndex == props.team.id ? (
        <div className="flex flex-col w-full gap-1 items-center text-xs md:text-sm">
          {props.team.players.map((player) => {
            return <PlayerItem player={player} key={player.id} />
          })}
        </div>
      ) : (
        <></>
      )}
    </button>
  )
}

const PlayerItem = ({ player }) => {
  return (
    <div className="flex gap-3 md:gap-4 items-center justify-center w-full">
      <p className="basis-5/12 text-end">{player.position}</p>
      <p className="basis-7/12 text-start">{player.name}</p>
    </div>
  )
}
