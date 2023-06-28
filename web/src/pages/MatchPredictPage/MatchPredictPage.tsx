import { MetaTags } from '@redwoodjs/web'

import PredictMatchCell from 'src/components/PredictMatchCell'

const MatchPredictPage = ({ id }: { id: number }) => (
  <>
    <MetaTags
      title="Predict Match"
      description="Match prediction page for Final Whistle - the football prediction game"
    />

    <PredictMatchCell id={id} />
  </>
)

export default MatchPredictPage
