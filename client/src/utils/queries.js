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
      _id
      postText
      imageURL
      activityLevel
      username
      profilePicture
    }
  }
`;

export const GET_POSTS_BY_USERNAME = gql`
  query getPostsByUsername($username: String!) {
    getPostsByUsername(username: $username) {
      postText
      imageURL
    }
  }
`;

export const GET_COMMENTS_BY_POST_ID = gql`
  query getCommentsByPostId($postId: ID){
    getCommentsByPostId(postId: $postId){
      content
      username
      profilePicture
      activityLevel
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