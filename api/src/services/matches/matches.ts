import type {
  QueryResolvers,
  MutationResolvers,
  MatchRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const matches: QueryResolvers['matches'] = () => {
  return db.match.findMany()
}

export const mostChosenTeams = async ({
  tournamentId,
}: {
  tournamentId: number
}) => {
  const allMatches = await db.match.findMany({
    where: {
      tournamentId: tournamentId,
    },
  })
  const allPredictions = await db.matchPrediction.findMany({
    where: {
      match: {
        tournamentId: tournamentId,
      },
    },
  })

  const mostChosenWinningTeams = {}
  const mostChosenLosingTeams = {}
  const mostChosenDrawingTeams = {}

  allPredictions.forEach((pred) => {
    const match = allMatches.find((match) => pred.matchId == match.id)
    if (pred.predictedScoreOfHomeTeam > pred.predictedScoreOfAwayTeam) {
      //Add home team to winning array
      if (
        Object.keys(mostChosenWinningTeams).includes(
          match.homeTeamId.toString()
        )
      ) {
        mostChosenWinningTeams[match.homeTeamId.toString()] += 1
      } else {
        mostChosenWinningTeams[match.homeTeamId.toString()] = 1
      }
      //Add away team to losing array
      if (
        Object.keys(mostChosenLosingTeams).includes(match.awayTeamId.toString())
      ) {
        mostChosenLosingTeams[match.awayTeamId.toString()] += 1
      } else {
        mostChosenLosingTeams[match.awayTeamId.toString()] = 1
      }
    } else if (pred.predictedScoreOfHomeTeam < pred.predictedScoreOfAwayTeam) {
      //Add home team to losing array
      if (
        Object.keys(mostChosenLosingTeams).includes(match.homeTeamId.toString())
      ) {
        mostChosenLosingTeams[match.homeTeamId.toString()] += 1
      } else {
        mostChosenLosingTeams[match.homeTeamId.toString()] = 1
      }
      //Add away team to winning array
      if (
        Object.keys(mostChosenWinningTeams).includes(
          match.awayTeamId.toString()
        )
      ) {
        mostChosenWinningTeams[match.awayTeamId.toString()] += 1
      } else {
        mostChosenWinningTeams[match.awayTeamId.toString()] = 1
      }
    } else if (pred.predictedScoreOfHomeTeam == pred.predictedScoreOfAwayTeam) {
      //Add home team to drawing array
      if (
        Object.keys(mostChosenDrawingTeams).includes(
          match.homeTeamId.toString()
        )
      ) {
        mostChosenDrawingTeams[match.homeTeamId.toString()] += 1
      } else {
        mostChosenDrawingTeams[match.homeTeamId.toString()] = 1
      }
      //Add away team to drawing array
      if (
        Object.keys(mostChosenDrawingTeams).includes(
          match.awayTeamId.toString()
        )
      ) {
        mostChosenDrawingTeams[match.awayTeamId.toString()] += 1
      } else {
        mostChosenDrawingTeams[match.awayTeamId.toString()] = 1
      }
    }
  })

  // Create items array for winning teams
  const winningItems: [string, number][] = Object.keys(
    mostChosenWinningTeams
  ).map((key) => {
    return [key, mostChosenWinningTeams[key]]
  })
  // Create items array for losing teams
  const losingItems: [string, number][] = Object.keys(
    mostChosenLosingTeams
  ).map((key) => {
    return [key, mostChosenLosingTeams[key]]
  })
  // Create items array for drawing teams
  const drawingItems: [string, number][] = Object.keys(
    mostChosenDrawingTeams
  ).map((key) => {
    return [key, mostChosenDrawingTeams[key]]
  })

  // Sort the array based on the second element (occurence)
  winningItems.sort((first, second) => {
    return second[1] - first[1]
  })
  losingItems.sort((first, second) => {
    return second[1] - first[1]
  })
  drawingItems.sort((first, second) => {
    return second[1] - first[1]
  })

  // Create a new array with only the first 5 winning teams
  const winningResultSet = []
  const winningTeamIds = winningItems.slice(0, 5).map((item) => Number(item[0]))
  const winningTeams = await db.team.findMany({
    where: {
      id: {
        in: winningTeamIds,
      },
    },
  })
  winningTeams.forEach(async (item) => {
    winningResultSet.push({
      team: item,
      occurence: mostChosenWinningTeams[item.id],
    })
  })

  // Create a new array with only the first 5 losing teams
  const losingResultSet = []
  const losingTeamIds = losingItems.slice(0, 5).map((item) => Number(item[0]))
  const losingTeams = await db.team.findMany({
    where: {
      id: {
        in: losingTeamIds,
      },
    },
  })
  losingTeams.forEach(async (item) => {
    losingResultSet.push({
      team: item,
      occurence: mostChosenLosingTeams[item.id],
    })
  })

  // Create a new array with only the first 5 drawing teams
  const drawingResultSet = []
  const drawingTeamIds = drawingItems.slice(0, 5).map((item) => Number(item[0]))
  const drawingTeams = await db.team.findMany({
    where: {
      id: {
        in: drawingTeamIds,
      },
    },
  })
  drawingTeams.forEach(async (item) => {
    drawingResultSet.push({
      team: item,
      occurence: mostChosenDrawingTeams[item.id],
    })
  })

  return {
    winningTeams: winningResultSet.sort((a, b) => b.occurence - a.occurence),
    losingTeams: losingResultSet.sort((a, b) => b.occurence - a.occurence),
    drawingTeams: drawingResultSet.sort((a, b) => b.occurence - a.occurence),
  }
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

export const Match: MatchRelationResolvers = {
  tournament: (_obj, { root }) => {
    return db.match.findUnique({ where: { id: root?.id } }).tournament()
  },
  homeTeam: (_obj, { root }) => {
    return db.match.findUnique({ where: { id: root?.id } }).homeTeam()
  },
  awayTeam: (_obj, { root }) => {
    return db.match.findUnique({ where: { id: root?.id } }).awayTeam()
  },
  predictions: (_obj, { root }) => {
    return db.match.findUnique({ where: { id: root?.id } }).predictions()
  },
}
