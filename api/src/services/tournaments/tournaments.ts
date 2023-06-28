import type {
  QueryResolvers,
  MutationResolvers,
  TournamentRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const tournaments: QueryResolvers['tournaments'] = () => {
  return db.tournament.findMany()
}

export const tournament: QueryResolvers['tournament'] = ({ id }) => {
  return db.tournament.findUnique({
    where: { id },
  })
}

export const createTournament: MutationResolvers['createTournament'] = ({
  input,
}) => {
  return db.tournament.create({
    data: input,
  })
}

export const updateTournament: MutationResolvers['updateTournament'] = ({
  id,
  input,
}) => {
  return db.tournament.update({
    data: input,
    where: { id },
  })
}

export const deleteTournament: MutationResolvers['deleteTournament'] = ({
  id,
}) => {
  return db.tournament.delete({
    where: { id },
  })
}

export const Tournament: TournamentRelationResolvers = {
  matches: (_obj, { root }) => {
    return db.tournament.findUnique({ where: { id: root?.id } }).matches()
  },
  teams: (_obj, { root }) => {
    return db.tournament.findUnique({ where: { id: root?.id } }).teams()
  },
}
