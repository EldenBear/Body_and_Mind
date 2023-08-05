const { gql } = require('apollo-server-express');

// Definitions below are not set in stone. Need more front end info just in case

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    age: String
    aboutme: String
    hobbies: String
    gender: String
    profilePicture: String
    activityLevel: String
    postId: ID
    comments: [Comment]
  }

  type Post {
    _id: ID!
    userId: ID
    postText: String
    imageURL: String
  }

  input PostInput {
    userId: ID
    postText: String
    imageURL: String
  }

  type Comment {
    content: String!
    createdAt: String
  }

  input CommentInput {
    content: String!
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
    username: String
    aboutme: String
    age: String
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
    user(username: String!): User
    exercises: [Exercise]!
    comments: [Comment]
  }

  type Mutation {
    register(username: String!, password: String!): AuthPayload
    login(username: String!, password: String!): AuthPayload
    addBio(bio: BioInput!): User
    addComment(comment: CommentInput): Comment
    addPost(post: PostInput): Post
  }
`;

module.exports = typeDefs;
