import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      age
      aboutme
      hobbies
      gender
      profilePicture
      activityLevel
      comments {
        content
        createdAt
      }
    }
  }
`;

//get all comments
export const GET_ALL_COMMENTS = gql`
  query getAllComments {
    comments {
      content
      createdAt
    }
  }
`;

//get comments by userId
export const GET_COMMENTS_BY_USER_ID = gql`
  query getCommentsByUserId($userId: ID!) {
    commentsByUser(userId: $userId) {
      content
      createdAt
    }
  }
`;

// export const GET_SOME_DATA from server/schemas/typeDef.js
// look like " export const GET_SOME_DATA = gql`
//   query getSomeOtherData {

// }
// Note to self: Once server/schemas/typeDef.js is added on add some others based on what is commented
