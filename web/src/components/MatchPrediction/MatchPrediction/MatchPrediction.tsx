import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_MATCH_PREDICTION_MUTATION = gql`
  mutation DeleteMatchPredictionMutation($id: Int!) {
    deleteMatchPrediction(id: $id) {
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

const MatchPrediction = ({ matchPrediction }) => {
  const [deleteMatchPrediction] = useMutation(
    DELETE_MATCH_PREDICTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('MatchPrediction deleted')
        navigate(routes.matchPredictions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onDeleteClick = (id) => {
    if (
      confirm('Are you sure you want to delete matchPrediction ' + id + '?')
    ) {
      deleteMatchPrediction({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            MatchPrediction {matchPrediction.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{matchPrediction.id}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{matchPrediction.userId}</td>
            </tr>
            <tr>
              <th>Match id</th>
              <td>{matchPrediction.matchId}</td>
            </tr>
            <tr>
              <th>Predicted score of team1</th>
              <td>{matchPrediction.predictedScoreOfTeam1}</td>
            </tr>
            <tr>
              <th>Predicted score of team2</th>
              <td>{matchPrediction.predictedScoreOfTeam2}</td>
            </tr>
            <tr>
              <th>Predicted scoring players of team1</th>
              <td>{matchPrediction.predictedScoringPlayersOfTeam1}</td>
            </tr>
            <tr>
              <th>Predicted scoring players of team2</th>
              <td>{matchPrediction.predictedScoringPlayersOfTeam2}</td>
            </tr>
            <tr>
              <th>Wagered coins</th>
              <td>{matchPrediction.wageredCoins}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(matchPrediction.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(matchPrediction.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editMatchPrediction({ id: matchPrediction.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(matchPrediction.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default MatchPrediction
