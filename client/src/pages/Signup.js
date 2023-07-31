import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import '../components/Signup.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;

        if (!passwordPattern.test(password)) {
            setError('Password must be at least 6 characters long and contain at least one capital letter and one special character.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
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
        <Box p={4} maxWidth="400px" margin="0 auto">
            <form onSubmit={handleSubmit}>
                <FormControl id="email" mb={4}>
                    <FormLabel>Username</FormLabel>
                    <Input type="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </FormControl>
                <FormControl id="password" mb={4}>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </FormControl>
                <FormControl id="confirmPassword" mb={4}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </FormControl>
                <Button type="submit" colorScheme="green">Confirm Signup</Button>

                <Link to="/">
                    <Button colorScheme="blue" mt={4}>Back to Login</Button>
                </Link>
            </form>
        </Box>
    );
};

export default Signup;