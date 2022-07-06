import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  PlayerResolvers,
} from 'types/graphql'

export const players: QueryResolvers['players'] = () => {
  return db.player.findMany()
}

export const player: QueryResolvers['player'] = ({ id }) => {
  return db.player.findUnique({
    where: { id },
  })
}

export const createPlayer: MutationResolvers['createPlayer'] = ({ input }) => {
  return db.player.create({
    data: input,
  })
}

export const updatePlayer: MutationResolvers['updatePlayer'] = ({
  id,
  input,
}) => {
  return db.player.update({
    data: input,
    where: { id },
  })
}

export const deletePlayer: MutationResolvers['deletePlayer'] = ({ id }) => {
  return db.player.delete({
    where: { id },
  })
}

export const Player: PlayerResolvers = {
  team: (_obj, { root }) =>
    db.player.findUnique({ where: { id: root.id } }).team(),
  scoredForTeamInMatch: (_obj, { root }) =>
    db.player.findUnique({ where: { id: root.id } }).scoredForTeamInMatch(),
}
