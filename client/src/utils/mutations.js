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
