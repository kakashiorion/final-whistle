export const schema = gql`
  type TeamsInMatch {
    id: Int!
    matchId: Int!
    match: Match!
    teamId: Int!
    team: Team!
    score: Int
    scoringPlayers: [Int]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    teamsInMatches: [TeamsInMatch!]! @requireAuth
    teamsInMatch(id: Int!): TeamsInMatch @requireAuth
  }

  input CreateTeamsInMatchInput {
    matchId: Int!
    teamId: Int!
    score: Int
    scoringPlayers: [Int]!
  }

  input UpdateTeamsInMatchInput {
    matchId: Int
    teamId: Int
    score: Int
    scoringPlayers: [Int]!
  }

  type Mutation {
    createTeamsInMatch(input: CreateTeamsInMatchInput!): TeamsInMatch!
      @requireAuth
    updateTeamsInMatch(
      id: Int!
      input: UpdateTeamsInMatchInput!
    ): TeamsInMatch! @requireAuth
    deleteTeamsInMatch(id: Int!): TeamsInMatch! @requireAuth
  }
`
