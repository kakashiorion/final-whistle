import EditPlayerCell from 'src/components/Player/EditPlayerCell'

type PlayerPageProps = {
  id: number
}

const EditPlayerPage = ({ id }: PlayerPageProps) => {
  return <EditPlayerCell id={id} />
}

export default EditPlayerPage
