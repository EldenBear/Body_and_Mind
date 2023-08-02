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

  //   Made async because we are talking to the database
  const handleSubmit = async (e) => {
    console.log('Form Submitted.');
    e.preventDefault();

    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;

    if (!passwordPattern.test(password)) {
      setError(
        'Password must be at least 6 characters long and contain at least one capital letter and one special character.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Talking with GraphQL before registering
    try {
      const { data } = await register({
        variables: { username: username, password: password },
      });

      if (data && data.register && data.register.token) {
        const { token } = data.register;
        Auth.login(token);
      } else {
        // If token doesn't exist
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Error occurred during registration');
    }

    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

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
                type='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id='password' mb={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl id='confirmPassword' mb={4}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
