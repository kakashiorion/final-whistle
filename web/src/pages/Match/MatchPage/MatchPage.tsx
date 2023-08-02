import MatchCell from 'src/components/Match/MatchCell'

type MatchPageProps = {
  id: number
}

const MatchPage = ({ id }: MatchPageProps) => {
  return <MatchCell id={id} />
}

export default MatchPage
