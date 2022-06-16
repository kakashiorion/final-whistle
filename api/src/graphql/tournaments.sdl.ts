export const schema = gql`
  type Tournament {
    id: Int!
    name: String!
    venue: String
    logoURL: String
    matches: [Match]!
    teams: [Team]!
    startDate: DateTime!
    endDate: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    tournaments: [Tournament!]! @requireAuth
    tournament(id: Int!): Tournament @requireAuth
  }

  input CreateTournamentInput {
    name: String!
    venue: String
    logoURL: String
    startDate: DateTime!
    endDate: DateTime!
  }

  input UpdateTournamentInput {
    name: String
    venue: String
    logoURL: String
    startDate: DateTime
    endDate: DateTime
  }

  type Mutation {
    createTournament(input: CreateTournamentInput!): Tournament! @requireAuth
    updateTournament(id: Int!, input: UpdateTournamentInput!): Tournament!
      @requireAuth
    deleteTournament(id: Int!): Tournament! @requireAuth
  }
`
