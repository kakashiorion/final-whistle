import type {
  FindResultMatchQuery,
  FindResultMatchQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindResultMatchQuery($id: Int!) {
    resultMatch: match(id: $id) {
      id
      location
      matchDate
      maxWagerLimit
      round
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindResultMatchQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  resultMatch,
}: CellSuccessProps<FindResultMatchQuery, FindResultMatchQueryVariables>) => {
  return <div>{JSON.stringify(resultMatch)}</div>
}
