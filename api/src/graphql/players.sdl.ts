export const schema = gql`
  type Player {
    id: Int!
    name: String!
    position: String!
    team: Team
    teamId: Int
    scoredForTeamInMatch: [TeamsInMatch]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    players: [Player!]! @requireAuth
    player(id: Int!): Player @requireAuth
  }

  input CreatePlayerInput {
    name: String!
    position: String!
    teamId: Int
  }

  input UpdatePlayerInput {
    name: String
    position: String
    teamId: Int
  }

  type Mutation {
    createPlayer(input: CreatePlayerInput!): Player! @requireAuth
    updatePlayer(id: Int!, input: UpdatePlayerInput!): Player! @requireAuth
    deletePlayer(id: Int!): Player! @requireAuth
  }
`
