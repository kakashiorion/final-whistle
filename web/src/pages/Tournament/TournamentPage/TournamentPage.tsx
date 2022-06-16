import TournamentCell from 'src/components/Tournament/TournamentCell'

type TournamentPageProps = {
  id: number
}

const TournamentPage = ({ id }: TournamentPageProps) => {
  return <TournamentCell id={id} />
}

export default TournamentPage
