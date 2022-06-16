import PlayerCell from 'src/components/Player/PlayerCell'

type PlayerPageProps = {
  id: number
}

const PlayerPage = ({ id }: PlayerPageProps) => {
  return <PlayerCell id={id} />
}

export default PlayerPage
