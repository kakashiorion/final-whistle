import type {
  QueryResolvers,
  MutationResolvers,
  MatchPredictionRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const matchPredictions: QueryResolvers['matchPredictions'] = () => {
  return db.matchPrediction.findMany()
}

export const mostChosenScorelines = async ({
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
  const mostChosenScorelines = {}
  predictions.forEach((pred) => {
    const scoreline =
      pred.predictedScoreOfHomeTeam.toString() +
      '-' +
      pred.predictedScoreOfAwayTeam.toString()
    if (Object.keys(mostChosenScorelines).includes(scoreline)) {
      mostChosenScorelines[scoreline] += 1
    } else {
      mostChosenScorelines[scoreline] = 1
    }
  })
  // Create items array
  const items: [string, number][] = Object.keys(mostChosenScorelines).map(
    (key) => {
      return [key, mostChosenScorelines[key]]
    }
  )

  // Sort the array based on the second element
  items.sort((first, second) => {
    return second[1] - first[1]
  })

  const resultSet = []
  // Create a new array with only the first 5 items
  items.slice(0, 5).forEach((item) => {
    resultSet.push({
      scoreline: item[0],
      occurence: item[1],
    })
  })
  return resultSet.sort((a, b) => b.occurence - a.occurence)
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

export const MatchPrediction: MatchPredictionRelationResolvers = {
  user: (_obj, { root }) => {
    return db.matchPrediction.findUnique({ where: { id: root?.id } }).user()
  },
  match: (_obj, { root }) => {
    return db.matchPrediction.findUnique({ where: { id: root?.id } }).match()
  },
}
