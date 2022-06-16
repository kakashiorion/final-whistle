import EditMatchCell from 'src/components/Match/EditMatchCell'

type MatchPageProps = {
  id: number
}

const EditMatchPage = ({ id }: MatchPageProps) => {
  return <EditMatchCell id={id} />
}

export default EditMatchPage
