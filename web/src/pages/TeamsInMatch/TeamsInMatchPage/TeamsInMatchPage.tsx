import TeamsInMatchCell from 'src/components/TeamsInMatch/TeamsInMatchCell'

type TeamsInMatchPageProps = {
  id: number
}

const TeamsInMatchPage = ({ id }: TeamsInMatchPageProps) => {
  return <TeamsInMatchCell id={id} />
}

export default TeamsInMatchPage
