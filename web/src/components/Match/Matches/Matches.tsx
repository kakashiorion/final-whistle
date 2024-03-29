import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/Match/MatchesCell'

const DELETE_MATCH_MUTATION = gql`
  mutation DeleteMatchMutation($id: Int!) {
    deleteMatch(id: $id) {
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

const MatchesList = ({ matches }) => {
  const [deleteMatch] = useMutation(DELETE_MATCH_MUTATION, {
    onCompleted: () => {
      toast.success('Match deleted')
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
    if (confirm('Are you sure you want to delete match ' + id + '?')) {
      deleteMatch({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Location</th>
            <th>Match date</th>
            <th>Round</th>
            <th>Tournament id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Max wager limit</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.id}>
              <td>{truncate(match.id)}</td>
              <td>{truncate(match.location)}</td>
              <td>{timeTag(match.matchDate)}</td>
              <td>{truncate(match.round)}</td>
              <td>{truncate(match.tournamentId)}</td>
              <td>{timeTag(match.createdAt)}</td>
              <td>{timeTag(match.updatedAt)}</td>
              <td>{truncate(match.maxWagerLimit)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.match({ id: match.id })}
                    title={'Show match ' + match.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editMatch({ id: match.id })}
                    title={'Edit match ' + match.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete match ' + match.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(match.id)}
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

export default MatchesList
