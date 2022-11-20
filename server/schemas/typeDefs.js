const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type SavedBook {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String
    savedBooks: [SavedBook]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    savedBooks: [SavedBook]
  }

  input Book {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBook(book: Book!): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
