import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import "../components/Login.css";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Username:', username);
    console.log('Password:', password);

    setUsername('');
    setPassword('');
  };

  return (
    <Box p={4} maxWidth="400px" margin="0 auto">
      <form onSubmit={handleSubmit}>
        <FormControl id="username" mb={4}>
          <FormLabel>Username</FormLabel>
          <Input type="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormControl>
        <FormControl id="password" mb={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="blue">Login</Button>
        <Link to="/signup">
          <Button colorScheme="green" mt={4}>Signup Here!</Button>
        </Link>
      </form>
    </Box>
  );
};

export default Login;
