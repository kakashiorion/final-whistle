import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  MatchResolvers,
} from 'types/graphql'

export const matches: QueryResolvers['matches'] = () => {
  return db.match.findMany()
}

export const match: QueryResolvers['match'] = ({ id }) => {
  return db.match.findUnique({
    where: { id },
  })
}

export const createMatch: MutationResolvers['createMatch'] = ({ input }) => {
  return db.match.create({
    data: input,
  })
}

export const updateMatch: MutationResolvers['updateMatch'] = ({
  id,
  input,
}) => {
  return db.match.update({
    data: input,
    where: { id },
  })
}

export const deleteMatch: MutationResolvers['deleteMatch'] = ({ id }) => {
  return db.match.delete({
    where: { id },
  })
}

export const Match: MatchResolvers = {
  tournament: (_obj, { root }) =>
    db.match.findUnique({ where: { id: root.id } }).tournament(),
  teams: (_obj, { root }) =>
    db.match.findUnique({ where: { id: root.id } }).teams(),
}
