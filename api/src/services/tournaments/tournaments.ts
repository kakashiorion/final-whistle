import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  TournamentResolvers,
} from 'types/graphql'

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

export const Tournament: TournamentResolvers = {
  matches: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).matches(),
  teams: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).teams(),
}
