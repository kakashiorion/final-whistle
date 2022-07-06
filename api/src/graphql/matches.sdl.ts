export const schema = gql`
  type Match {
    id: Int!
    location: String!
    matchDate: DateTime!
    round: String!
    tournament: Tournament!
    tournamentId: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    teams: [TeamsInMatch]!
    maxWagerLimit: Int!
    predictions: [MatchPrediction]!
  }

  type Query {
    matches: [Match!]! @requireAuth
    match(id: Int!): Match @requireAuth
  }

  input CreateMatchInput {
    location: String!
    matchDate: DateTime!
    round: String!
    tournamentId: Int!
    maxWagerLimit: Int!
  }

  input UpdateMatchInput {
    location: String
    matchDate: DateTime
    round: String
    tournamentId: Int
    maxWagerLimit: Int
  }

  type Mutation {
    createMatch(input: CreateMatchInput!): Match! @requireAuth
    updateMatch(id: Int!, input: UpdateMatchInput!): Match! @requireAuth
    deleteMatch(id: Int!): Match! @requireAuth
  }
`
