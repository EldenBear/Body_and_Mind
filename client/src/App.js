import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import WorkoutPage from './pages/WorkoutPage';
import ProfilePage from './pages/ProfilePage';

// Endpoint for GraphQL
const httpLink = createHttpLink({
  uri: '/graphql',
});

// JWT Authorization Header Middleware For Every Request
const authLink = setContext((_, { headers }) => {
  // Get token from local storage if available
  const token = localStorage.getItem('id_token');
  // Return headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const theme = extendTheme({
  colors: {
    secondary: {
      50: '#f7f8ed',
      100: '#f7f8ed',
      500: '#f7f8ed',
    },
    primary: {
      50: '#d9f3f6',
      100: '#d9f3f6',
      500: '#d9f3f6',
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Router>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/profile/:id' element={<ProfilePage />} />
            <Route path='/workouts' element={<WorkoutPage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
