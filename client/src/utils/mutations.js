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

//adding comment
// export const ADD_COMMENT = gql`
//   mutation AddComment($content: String!, $postId: ID!) {
//     addComment(content: $content, postId: $postId) {
//       content
//       createdAt
//     }
//   }
// `;

//adding post
// export const ADD_POST = gql`
//   mutation AddPost($title: String!, $description: String!, $image: String!) {
//     addPost(title: $title, description: $description, image: $image) {
//       title
//       description
//       image
//     }
//   }
// `;

//removing post
// export const DELETE_POST = gql`
//   mutation DeletePost($postId: ID!) {
//     deletePost(postId: $postId) {
//     }
//   }
// `;
