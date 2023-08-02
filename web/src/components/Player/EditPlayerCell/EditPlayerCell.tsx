import type { EditPlayerById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import PlayerForm from 'src/components/Player/PlayerForm'

export const QUERY = gql`
  query EditPlayerById($id: Int!) {
    player: player(id: $id) {
      id
      name
      position
      teamId
      createdAt
      updatedAt
    }
  }
`
const UPDATE_PLAYER_MUTATION = gql`
  mutation UpdatePlayerMutation($id: Int!, $input: UpdatePlayerInput!) {
    updatePlayer(id: $id, input: $input) {
      id
      name
      position
      teamId
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ player }: CellSuccessProps<EditPlayerById>) => {
  const [updatePlayer, { loading, error }] = useMutation(
    UPDATE_PLAYER_MUTATION,
    {
      onCompleted: () => {
        toast.success('Player updated')
        navigate(routes.players())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    const castInput = Object.assign(input, { teamId: parseInt(input.teamId) })
    updatePlayer({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Player {player.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <PlayerForm
          player={player}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
