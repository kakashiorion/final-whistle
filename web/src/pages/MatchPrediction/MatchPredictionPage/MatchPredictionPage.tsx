import MatchPredictionCell from 'src/components/MatchPrediction/MatchPredictionCell'

type MatchPredictionPageProps = {
  id: number
}

const MatchPredictionPage = ({ id }: MatchPredictionPageProps) => {
  return <MatchPredictionCell id={id} />
}

export default MatchPredictionPage
