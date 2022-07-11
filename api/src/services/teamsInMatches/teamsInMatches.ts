import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  TeamsInMatchResolvers,
} from 'types/graphql'

export const teamsInMatches: QueryResolvers['teamsInMatches'] = () => {
  return db.teamsInMatch.findMany()
}

export const teamsInMatch: QueryResolvers['teamsInMatch'] = ({ id }) => {
  return db.teamsInMatch.findUnique({
    where: { id },
  })
}

export const createTeamsInMatch: MutationResolvers['createTeamsInMatch'] = ({
  input,
}) => {
  return db.teamsInMatch.create({
    data: input,
  })
}

export const updateTeamsInMatch: MutationResolvers['updateTeamsInMatch'] = ({
  id,
  input,
}) => {
  return db.teamsInMatch.update({
    data: input,
    where: { id },
  })
}

export const deleteTeamsInMatch: MutationResolvers['deleteTeamsInMatch'] = ({
  id,
}) => {
  return db.teamsInMatch.delete({
    where: { id },
  })
}

export const TeamsInMatch: TeamsInMatchResolvers = {
  match: (_obj, { root }) =>
    db.teamsInMatch.findUnique({ where: { id: root.id } }).match(),
  team: (_obj, { root }) =>
    db.teamsInMatch.findUnique({ where: { id: root.id } }).team(),
}
