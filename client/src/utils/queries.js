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
// Might not need
export const ALL_POST_IDS = gql`
  query {
    allPostIds
  }
`;
// Might not need
export const GET_POST_ID = gql`
  query postId($id: Post) {
    postId(id: $id) {
      _id
    }
  }
`;

export const GET_POSTS = gql`
  query getPosts {
    getPosts {
      postText
      imageURL
    }
  }
`;

export const SINGLE_POST = gql`
  query singleUserPosts($userId: ID) {
    singleUserPosts(userId: $userId) {
      postText
      imageURL
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
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
// export const GET_ALL_COMMENTS = gql`
//   query getAllComments {
//     comments {
//       content
//       createdAt
//     }
//   }
// `;

//get comments by userId
// export const GET_COMMENTS_BY_USER_ID = gql`
//   query getCommentsByUserId($userId: ID!) {
//     commentsByUser(userId: $userId) {
//       content
//       createdAt
//     }
//   }
// `;
