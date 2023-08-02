import EditMatchPredictionCell from 'src/components/MatchPrediction/EditMatchPredictionCell'

type MatchPredictionPageProps = {
  id: number
}

const EditMatchPredictionPage = ({ id }: MatchPredictionPageProps) => {
  return <EditMatchPredictionCell id={id} />
}

export default EditMatchPredictionPage
