export const schema = gql`
  type MatchPrediction {
    id: Int!
    userId: Int!
    user: User!
    matchId: Int!
    match: Match!
    predictedScoreOfHomeTeam: Int!
    predictedScoreOfAwayTeam: Int!
    predictedScoringPlayersOfHomeTeam: [Int]!
    predictedScoringPlayersOfAwayTeam: [Int]!
    wageredCoins: Int!
    scorelineMultiplier: Int
    goalScorerMultiplier: Int
    earnedPoints: Int
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type ScorelineResult {
    scoreline: String!
    occurence: Int!
  }

  type Query {
    matchPredictions: [MatchPrediction!]! @requireAuth
    matchPrediction(id: Int!): MatchPrediction @requireAuth
    mostChosenScorelines(tournamentId: Int!): [ScorelineResult!]! @requireAuth
  }

  input CreateMatchPredictionInput {
    userId: Int!
    matchId: Int!
    predictedScoreOfHomeTeam: Int!
    predictedScoreOfAwayTeam: Int!
    predictedScoringPlayersOfHomeTeam: [Int]!
    predictedScoringPlayersOfAwayTeam: [Int]!
    wageredCoins: Int!
    scorelineMultiplier: Int
    goalScorerMultiplier: Int
    earnedPoints: Int
  }

  input UpdateMatchPredictionInput {
    userId: Int
    matchId: Int
    predictedScoreOfHomeTeam: Int
    predictedScoreOfAwayTeam: Int
    predictedScoringPlayersOfHomeTeam: [Int]!
    predictedScoringPlayersOfAwayTeam: [Int]!
    wageredCoins: Int
    scorelineMultiplier: Int
    goalScorerMultiplier: Int
    earnedPoints: Int
  }

  type Mutation {
    createMatchPrediction(input: CreateMatchPredictionInput!): MatchPrediction!
      @requireAuth
    updateMatchPrediction(
      id: Int!
      input: UpdateMatchPredictionInput!
    ): MatchPrediction! @requireAuth
    deleteMatchPrediction(id: Int!): MatchPrediction! @requireAuth
  }
`
