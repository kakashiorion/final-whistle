import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_TEAMS_IN_MATCH_MUTATION = gql`
  mutation DeleteTeamsInMatchMutation($id: Int!) {
    deleteTeamsInMatch(id: $id) {
      id
    }
  }
`

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const TeamsInMatch = ({ teamsInMatch }) => {
  const [deleteTeamsInMatch] = useMutation(DELETE_TEAMS_IN_MATCH_MUTATION, {
    onCompleted: () => {
      toast.success('TeamsInMatch deleted')
      navigate(routes.teamsInMatches())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete teamsInMatch ' + id + '?')) {
      deleteTeamsInMatch({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">TeamsInMatch {teamsInMatch.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{teamsInMatch.id}</td>
            </tr><tr>
              <th>Match id</th>
              <td>{teamsInMatch.matchId}</td>
            </tr><tr>
              <th>Team id</th>
              <td>{teamsInMatch.teamId}</td>
            </tr><tr>
              <th>Score</th>
              <td>{teamsInMatch.score}</td>
            </tr><tr>
              <th>Scoring players</th>
              <td>{teamsInMatch.scoringPlayers}</td>
            </tr><tr>
              <th>Created at</th>
              <td>{timeTag(teamsInMatch.createdAt)}</td>
            </tr><tr>
              <th>Updated at</th>
              <td>{timeTag(teamsInMatch.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editTeamsInMatch({ id: teamsInMatch.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(teamsInMatch.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default TeamsInMatch
