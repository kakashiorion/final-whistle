export const schema = gql`
  type Player {
    id: Int!
    name: String!
    position: PlayerPosition!
    team: Team!
    teamId: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum PlayerPosition {
    GK
    DF
    MD
    FW
  }

  type MostChosenPlayerType {
    player: Player!
    occurence: Int!
  }

  type Query {
    players: [Player!]! @requireAuth
    player(id: Int!): Player @requireAuth
    mostChosenPlayers(tournamentId: Int!): [MostChosenPlayerType!]! @requireAuth
  }

  input CreatePlayerInput {
    name: String!
    position: PlayerPosition!
    teamId: Int!
  }

  input UpdatePlayerInput {
    name: String
    position: PlayerPosition
    teamId: Int
  }

  type Mutation {
    createPlayer(input: CreatePlayerInput!): Player! @requireAuth
    updatePlayer(id: Int!, input: UpdatePlayerInput!): Player! @requireAuth
    deletePlayer(id: Int!): Player! @requireAuth
  }
`
