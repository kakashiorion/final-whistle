import { MetaTags } from '@redwoodjs/web'

import ResultMatchCell from 'src/components/ResultMatchCell'

const MatchResultPage = ({ id }: { id: number }) => {
  return (
    <>
      <MetaTags
        title="Match Result"
        description="Match result page for Final Whistle - the football prediction game"
      />

      <ResultMatchCell id={id} />
    </>
  )
}

export default MatchResultPage
