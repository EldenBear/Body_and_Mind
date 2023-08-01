import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
mutation register($name: String!, $email: String!, $password: String!) {
  register(name: $name, email: $email, password: $password) {
    token
    user {
      _id
      name
      email
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
}
`;

export const LOGIN_USER = gql`

`;

export const ADD_BIO = gql`

`; 

export const 

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
