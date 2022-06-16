import { MetaTags } from '@redwoodjs/web'
import ResultMatchCell from 'src/components/ResultMatchCell'

const MatchResultPage = ({ id }: { id: number }) => {
  return (
    <>
      <MetaTags title="MatchResult" description="MatchResult page" />

      <ResultMatchCell id={id} />
    </>
  )
}

export default MatchResultPage
