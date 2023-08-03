import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { LOGIN_USER } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import Auth from '../utils/auth';
import '../components/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useMutation(LOGIN_USER);
  const { loading, data } = useQuery(GET_ME);
  React.useEffect( () => {
    if (loading) {
      return
    }
    if (data?.me != null) {
      window.location.href = "/home";
    }
  },[loading, data?.me])

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: { username: username, password: password },
      });

      const { token } = data.login;
      Auth.login(token);
    } catch (err) {
      console.error(err);
    }

    setUsername('');
    setPassword('');
  };

  return (
    <div className='login-box' style={{ backgroundColor: '#d9f3f6' }}>
      <div className='centered-box'>
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          Body And Mind
        </h1>
        <Box
          p={4}
          maxWidth='400px'
          margin='0 auto'
          className='login-container login-page-container'
        >
          <form onSubmit={handleSubmit}>
            <FormControl id='username' mb={4}>
              <FormLabel>Username</FormLabel>
              <Input
                type='text'
                name='username'
                value={username}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id='password' mb={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type='password'
                name='password'
                value={password}
                onChange={handleInputChange}
              />
            </FormControl>
            <Button type='submit' colorScheme='blue' className='login-button'>
              Login
            </Button>
            <Link to='/signup'>
              <Button colorScheme='green' mt={4} className='signup-button'>
                Signup Here!
              </Button>
            </Link>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default Login;
