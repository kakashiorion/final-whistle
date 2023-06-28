export const schema = gql`
  type Team {
    id: Int!
    name: String!
    color: String
    flagURL: String
    players: [Player]!
    homeMatches: [Match]!
    awayMatches: [Match]!
    tournaments: [Tournament]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    teams: [Team!]! @requireAuth
    team(id: Int!): Team @requireAuth
  }

  input CreateTeamInput {
    name: String!
    color: String
    flagURL: String
  }

  input UpdateTeamInput {
    name: String
    color: String
    flagURL: String
  }

  type Mutation {
    createTeam(input: CreateTeamInput!): Team! @requireAuth
    updateTeam(id: Int!, input: UpdateTeamInput!): Team! @requireAuth
    deleteTeam(id: Int!): Team! @requireAuth
  }
`
