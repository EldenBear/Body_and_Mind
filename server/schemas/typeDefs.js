const { gql } = require('apollo-server-express');

// Definitions below are not set in stone. Need more front end info just in case

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    age: String
    aboutme: String
    hobbies: String
    gender: String
    profilePicture: String
    activityLevel: String
    comments: [Comment]
  }

  type Comment {
    content: String!
    createdAt: String
  }

  type Post {
    _id: ID!
    title: String
    description: String
    image: String
    user: [User]
    comments: [Comment]
  }

  type Exercise {
    name: String!
    type: String!
    muscle: String!
    equipment: String!
    difficulty: String!
    instructions: String!
  }

  input BioInput {
    aboutme: String
    hobbies: String
    gender: String
    profilePicture: String
    activityLevel: String
  }

  type AuthPayload {
    token: ID!
    user: User
  }

  type Query {
    me: User
    exercises: [Exercise]!

  }

  type Mutation {
    register(name: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    addBio(userId: ID!, bio: BioInput!): User
  }
`;

module.exports = typeDefs;
