import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/MatchPrediction/MatchPredictionsCell'

const DELETE_MATCH_PREDICTION_MUTATION = gql`
  mutation DeleteMatchPredictionMutation($id: Int!) {
    deleteMatchPrediction(id: $id) {
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

const MatchPredictionsList = ({ matchPredictions }) => {
  const [deleteMatchPrediction] = useMutation(DELETE_MATCH_PREDICTION_MUTATION, {
    onCompleted: () => {
      toast.success('MatchPrediction deleted')
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
    if (confirm('Are you sure you want to delete matchPrediction ' + id + '?')) {
      deleteMatchPrediction({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>User id</th>
            <th>Match id</th>
            <th>Predicted score of team1</th>
            <th>Predicted score of team2</th>
            <th>Predicted scoring players of team1</th>
            <th>Predicted scoring players of team2</th>
            <th>Wagered coins</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {matchPredictions.map((matchPrediction) => (
            <tr key={matchPrediction.id}>
              <td>{truncate(matchPrediction.id)}</td>
              <td>{truncate(matchPrediction.userId)}</td>
              <td>{truncate(matchPrediction.matchId)}</td>
              <td>{truncate(matchPrediction.predictedScoreOfTeam1)}</td>
              <td>{truncate(matchPrediction.predictedScoreOfTeam2)}</td>
              <td>{truncate(matchPrediction.predictedScoringPlayersOfTeam1)}</td>
              <td>{truncate(matchPrediction.predictedScoringPlayersOfTeam2)}</td>
              <td>{truncate(matchPrediction.wageredCoins)}</td>
              <td>{timeTag(matchPrediction.createdAt)}</td>
              <td>{timeTag(matchPrediction.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.matchPrediction({ id: matchPrediction.id })}
                    title={'Show matchPrediction ' + matchPrediction.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editMatchPrediction({ id: matchPrediction.id })}
                    title={'Edit matchPrediction ' + matchPrediction.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete matchPrediction ' + matchPrediction.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(matchPrediction.id)}
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

export default MatchPredictionsList
