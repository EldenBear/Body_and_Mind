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

// export const GET_SOME_DATA from server/schemas/typeDef.js
// look like " export const GET_SOME_DATA = gql`
//   query getSomeOtherData {

// }
// Note to self: Once server/schemas/typeDef.js is added on add some others based on what is commented
