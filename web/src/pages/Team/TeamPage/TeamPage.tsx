import TeamCell from 'src/components/Team/TeamCell'

type TeamPageProps = {
  id: number
}

const TeamPage = ({ id }: TeamPageProps) => {
  return <TeamCell id={id} />
}

export default TeamPage
