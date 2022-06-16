import EditTeamCell from 'src/components/Team/EditTeamCell'

type TeamPageProps = {
  id: number
}

const EditTeamPage = ({ id }: TeamPageProps) => {
  return <EditTeamCell id={id} />
}

export default EditTeamPage
