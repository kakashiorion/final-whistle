export const schema = gql`
  type Match {
    id: Int!
    location: String!
    matchDate: DateTime!
    round: String
    tournament: Tournament!
    tournamentId: Int!
    homeTeam: Team!
    homeTeamId: Int!
    awayTeam: Team!
    awayTeamId: Int!
    homeScore: Int
    awayScore: Int
    homeScoringPlayers: [Int]!
    awayScoringPlayers: [Int]!
    maxWagerLimit: Int!
    predictions: [MatchPrediction]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type TeamResultSetType {
    team: Team!
    occurence: Int!
  }

  type MostChosenTeamsType {
    winningTeams: [TeamResultSetType!]!
    losingTeams: [TeamResultSetType!]!
    drawingTeams: [TeamResultSetType!]!
  }

  type Query {
    matches: [Match!]! @requireAuth
    match(id: Int!): Match @requireAuth
    mostChosenTeams(tournamentId: Int!): MostChosenTeamsType! @requireAuth
  }

  input CreateMatchInput {
    location: String!
    matchDate: DateTime!
    round: String
    tournamentId: Int!
    homeTeamId: Int!
    awayTeamId: Int!
    homeScore: Int
    awayScore: Int
    homeScoringPlayers: [Int]!
    awayScoringPlayers: [Int]!
    maxWagerLimit: Int!
  }

  input UpdateMatchInput {
    location: String
    matchDate: DateTime
    round: String
    tournamentId: Int
    homeTeamId: Int
    awayTeamId: Int
    homeScore: Int
    awayScore: Int
    homeScoringPlayers: [Int]!
    awayScoringPlayers: [Int]!
    maxWagerLimit: Int
  }

  type Mutation {
    createMatch(input: CreateMatchInput!): Match! @requireAuth
    updateMatch(id: Int!, input: UpdateMatchInput!): Match! @requireAuth
    deleteMatch(id: Int!): Match! @requireAuth
  }
`
