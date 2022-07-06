import type {
  FindCurrentUserQuery,
  FindCurrentUserQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindCurrentUserQuery($id: Int!) {
    currentUser: user(id: $id) {
      id
      username
      email
      hashedPassword
      salt
      resetToken
      resetTokenExpiresAt
      points
      createdAt
      updatedAt
      roles
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindCurrentUserQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  currentUser,
}: CellSuccessProps<FindCurrentUserQuery, FindCurrentUserQueryVariables>) => {
  return <div>{JSON.stringify(currentUser)}</div>
}
