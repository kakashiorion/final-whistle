import type {
  QueryResolvers,
  MutationResolvers,
  PlayerRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const players: QueryResolvers['players'] = () => {
  return db.player.findMany()
}

export const mostChosenPlayers = async ({
  tournamentId,
}: {
  tournamentId: number
}) => {
  const predictions = await db.matchPrediction.findMany({
    where: {
      match: {
        tournamentId: tournamentId,
      },
    },
  })
  const mostChosenPlayers = {}
  predictions.forEach((pred) => {
    pred.predictedScoringPlayersOfHomeTeam.forEach((p) => {
      if (Object.keys(mostChosenPlayers).includes(p.toString())) {
        mostChosenPlayers[p] += 1
      } else {
        mostChosenPlayers[p] = 1
      }
    })
    pred.predictedScoringPlayersOfAwayTeam.forEach((p) => {
      if (Object.keys(mostChosenPlayers).includes(p.toString())) {
        mostChosenPlayers[p] += 1
      } else {
        mostChosenPlayers[p] = 1
      }
    })
  })
  // Create items array
  const items = Object.keys(mostChosenPlayers).map((key) => {
    return [key, mostChosenPlayers[key]]
  })

  // Sort the array based on the second element
  items.sort((first, second) => {
    return second[1] - first[1]
  })

  // Create a new array with only the first 5 items
  const result = items.slice(0, 5).map((item) => Number(item[0]))
  const players = await db.player.findMany({
    where: {
      id: {
        in: result,
      },
    },
  })
  const resultSet = []
  players.forEach((player) => {
    resultSet.push({
      player: player,
      occurence: mostChosenPlayers[player.id.toString()],
    })
  })
  return resultSet.sort((a, b) => b.occurence - a.occurence)
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

export const Player: PlayerRelationResolvers = {
  team: (_obj, { root }) => {
    return db.player.findUnique({ where: { id: root?.id } }).team()
  },
}
