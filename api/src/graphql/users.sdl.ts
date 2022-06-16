export const schema = gql`
  type User {
    id: Int!
    username: String
    email: String!
    hashedPassword: String!
    salt: String!
    points: Int
    predictions: [MatchPrediction]!
    createdAt: DateTime!
    updatedAt: DateTime!
    role: Role!
  }

  enum Role {
    Gamer
    Admin
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    username: String
    email: String!
    hashedPassword: String!
    salt: String!
    points: Int
    role: Role!
  }

  input UpdateUserInput {
    username: String
    email: String
    hashedPassword: String
    salt: String
    points: Int
    role: Role
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
