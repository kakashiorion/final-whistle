import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  MatchPredictionResolvers,
} from 'types/graphql'

export const matchPredictions: QueryResolvers['matchPredictions'] = () => {
  return db.matchPrediction.findMany()
}

export const matchPrediction: QueryResolvers['matchPrediction'] = ({ id }) => {
  return db.matchPrediction.findUnique({
    where: { id },
  })
}

export const createMatchPrediction: MutationResolvers['createMatchPrediction'] =
  ({ input }) => {
    return db.matchPrediction.create({
      data: input,
    })
  }

export const updateMatchPrediction: MutationResolvers['updateMatchPrediction'] =
  ({ id, input }) => {
    return db.matchPrediction.update({
      data: input,
      where: { id },
    })
  }

export const deleteMatchPrediction: MutationResolvers['deleteMatchPrediction'] =
  ({ id }) => {
    return db.matchPrediction.delete({
      where: { id },
    })
  }

export const MatchPrediction: MatchPredictionResolvers = {
  user: (_obj, { root }) =>
    db.matchPrediction.findUnique({ where: { id: root.id } }).user(),
}
