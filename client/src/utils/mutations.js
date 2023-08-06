import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const ADD_BIO = gql`
  mutation AddBio($bio: BioInput!) {
    addBio(bio: $bio) {
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

export const ADD_COMMENT = gql`
  mutation AddComment($comment: CommentInput, $postId: ID) {
    addComment(comment: $comment, postId: $postId) {
      content
    }
  }
`;

export const ADD_POST = gql`
  mutation AddPost($post: PostInput) {
    addPost(post: $post) {
      postText
      imageURL
    }
  }
`;