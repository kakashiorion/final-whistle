import type {
  FindPredictMatchQuery,
  FindPredictMatchQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindPredictMatchQuery($id: Int!) {
    predictMatch: match(id: $id) {
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
}: CellFailureProps<FindPredictMatchQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  predictMatch,
}: CellSuccessProps<FindPredictMatchQuery, FindPredictMatchQueryVariables>) => {
  return <div>{JSON.stringify(predictMatch)}</div>
}
