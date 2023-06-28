import { useState } from 'react'

import logo from 'public/Main 2.png'
import type { AllTeamsQuery } from 'types/graphql'

import { Redirect, routes } from '@redwoodjs/router'
import type { CellSuccessProps } from '@redwoodjs/web'

export const QUERY = gql`
  query AllTeamsQuery($tournamentId: Int!) {
    allTeams: tournament(id: $tournamentId) {
      id
      teams {
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
  }
`

export const Loading = () => (
  <div className="h-full w-full flex items-center justify-center">
    <img className="max-h-[25vh] animate-bounce" src={logo} alt="FW logo" />
  </div>
)
export const Empty = () => <Redirect to={routes.home()} />

export const Success = ({ allTeams }: CellSuccessProps<AllTeamsQuery>) => {
  const [expandedIndex, setExpandedIndex] = useState(0)
  return (
    <div
      id="AllTeamsDiv"
      className="flex flex-col w-full h-full overflow-hidden p-2 md:p-3 gap-2 md:gap-3 bg-black-3/70 rounded items-start justify-start"
    >
      <p className="text-primary-normal text-lg md:text-2xl">
        Teams and Players
      </p>
      <div className="flex flex-col w-full h-full p-1 overflow-y-scroll gap-2 md:gap-3 justify-start items-start nonscroll">
        {allTeams.teams.map((team) => {
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
      className="w-full rounded flex-col hover:shadow-sm hover:shadow-primary-normal text-secondary-dark text-sm md:text-base hover:text-white-3 hover:-translate-y-1 hover:-translate-x-1 hover:bg-secondary-dark hover:bg-opacity-60 flex gap-1 md:gap-2 items-center justify-evenly bg-white-3 p-2 md:p-3"
    >
      <div className="w-full flex gap-2 md:gap-3 items-center">
        <img className="h-5 md:h-6" src={props.team.flagURL} alt="team flag" />{' '}
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
      <p className="basis-1/3 text-end">{player.position}</p>
      <p className="basis-2/3 text-start">{player.name}</p>
    </div>
  )
}
