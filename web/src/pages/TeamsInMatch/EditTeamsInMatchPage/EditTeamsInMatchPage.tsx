import EditTeamsInMatchCell from 'src/components/TeamsInMatch/EditTeamsInMatchCell'

type TeamsInMatchPageProps = {
  id: number
}

const EditTeamsInMatchPage = ({ id }: TeamsInMatchPageProps) => {
  return <EditTeamsInMatchCell id={id} />
}

export default EditTeamsInMatchPage
