import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/TeamsInMatch/TeamsInMatchesCell'

const DELETE_TEAMS_IN_MATCH_MUTATION = gql`
  mutation DeleteTeamsInMatchMutation($id: Int!) {
    deleteTeamsInMatch(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

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

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const TeamsInMatchesList = ({ teamsInMatches }) => {
  const [deleteTeamsInMatch] = useMutation(DELETE_TEAMS_IN_MATCH_MUTATION, {
    onCompleted: () => {
      toast.success('TeamsInMatch deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete teamsInMatch ' + id + '?')) {
      deleteTeamsInMatch({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Match id</th>
            <th>Team id</th>
            <th>Score</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {teamsInMatches.map((teamsInMatch) => (
            <tr key={teamsInMatch.id}>
              <td>{truncate(teamsInMatch.id)}</td>
              <td>{truncate(teamsInMatch.matchId)}</td>
              <td>{truncate(teamsInMatch.teamId)}</td>
              <td>{truncate(teamsInMatch.score)}</td>
              <td>{timeTag(teamsInMatch.createdAt)}</td>
              <td>{timeTag(teamsInMatch.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.teamsInMatch({ id: teamsInMatch.id })}
                    title={'Show teamsInMatch ' + teamsInMatch.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editTeamsInMatch({ id: teamsInMatch.id })}
                    title={'Edit teamsInMatch ' + teamsInMatch.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete teamsInMatch ' + teamsInMatch.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(teamsInMatch.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TeamsInMatchesList
