import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      token
    }
  }
`;

// import { useMutation } from '@apollo/client';
// import Auth from '../utils/auth';

// // GraphQL useMutation invocation
// const [register] = useMutation(REGISTER_USER);

// try {
//   const { data } = await register({
//     variables: { username, password },
//   });

//   const { token } = data.register;
//   Auth.login(token);
// } catch (err) {
//   console.error(err);
//   setShowAlert(true);
// }
