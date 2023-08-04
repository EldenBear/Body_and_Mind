import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import '../components/Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // GraphQL useMutation invocation
  const [register] = useMutation(REGISTER_USER);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  //   Made async because we are talking to the database
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await register({
        variables: { username: username, password: password },
      });
      const { token } = data.register;
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setError('Error occurred during registration');
    }


    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  return (
    <div className='signup-box' style={{ backgroundColor: '#d9f3f6' }}>
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
          className='signup-container'
        >
          <form onSubmit={handleSubmit}>
            <FormControl id='email' mb={4}>
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
            <FormControl id='confirmPassword' mb={4}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type='password'
                name='confirmPassword'
                value={confirmPassword}
                onChange={handleInputChange}
              />
            </FormControl>
            <Button type='submit' colorScheme='green'>
              Confirm Signup
            </Button>

            <Link to='/'>
              <Button colorScheme='blue' mt={4}>
                Back to Login
              </Button>
            </Link>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default Signup;
