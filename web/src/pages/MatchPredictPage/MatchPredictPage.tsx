import { MetaTags } from '@redwoodjs/web'
import PredictMatchCell from 'src/components/PredictMatchCell'

const MatchPredictPage = ({ id }: { id: number }) => (
  <>
    <MetaTags title="MatchPredict" description="MatchPredict page" />

    <PredictMatchCell id={id} />
  </>
)

export default MatchPredictPage
