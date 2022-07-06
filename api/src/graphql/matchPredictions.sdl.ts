export const schema = gql`
  type MatchPrediction {
    id: Int!
    userId: Int!
    user: User!
    matchId: Int!
    match: Match!
    predictedScoreOfTeam1: Int!
    predictedScoreOfTeam2: Int!
    predictedScoringPlayersOfTeam1: [Int]!
    predictedScoringPlayersOfTeam2: [Int]!
    wageredPoints: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    matchPredictions: [MatchPrediction!]! @requireAuth
    matchPrediction(id: Int!): MatchPrediction @requireAuth
  }

  input CreateMatchPredictionInput {
    userId: Int!
    matchId: Int!
    predictedScoreOfTeam1: Int!
    predictedScoreOfTeam2: Int!
    predictedScoringPlayersOfTeam1: [Int]!
    predictedScoringPlayersOfTeam2: [Int]!
    wageredPoints: Int!
  }

  input UpdateMatchPredictionInput {
    userId: Int
    matchId: Int
    predictedScoreOfTeam1: Int
    predictedScoreOfTeam2: Int
    predictedScoringPlayersOfTeam1: [Int]!
    predictedScoringPlayersOfTeam2: [Int]!
    wageredPoints: Int
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
