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

//adding bio
export const ADD_BIO = gql`
  mutation AddBio($userId: ID!, $bio: BioInput!) {
    addBio(userId: $userId, bio: $bio) {
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

//adding comment
export const ADD_COMMENT = gql`
  mutation AddComment($content: String!, $postId: ID!) {
    addComment(content: $content, postId: $postId) {
      _id
      content
      createdAt
    }
  }
`;

//adding post 
export const ADD_POST = gql`
  mutation AddPost($title: String!, $description: String!, $image: String!) {
    addPost(title: $title, description: $description, image: $image) {
      _id
      title
      description
      image
    }
  }
`;

//removing post
export const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId) {
      _id
    }
  }
`;

// export const CREATE_MATCHUP = gql`
//   mutation createMatchup($tech1: String!, $tech2: String!) {
//     createMatchup(tech1: $tech1, tech2: $tech2) {
//       _id
//       tech1
//       tech2
//     }
//   }
// `;

// export const CREATE_VOTE = gql`
//   mutation createVote($_id: String!, $techNum: Int!) {
//     createVote(_id: $_id, techNum: $techNum) {
//       _id
//       tech1
//       tech2
//       tech1_votes
//       tech2_votes
//     }
//   }
// `;
