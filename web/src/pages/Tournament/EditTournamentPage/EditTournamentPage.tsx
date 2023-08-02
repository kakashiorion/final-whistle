import EditTournamentCell from 'src/components/Tournament/EditTournamentCell'

type TournamentPageProps = {
  id: number
}

const EditTournamentPage = ({ id }: TournamentPageProps) => {
  return <EditTournamentCell id={id} />
}

export default EditTournamentPage
