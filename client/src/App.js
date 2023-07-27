import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import WorkoutPage from './pages/WorkoutPage';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
      <Router>
          <Routes>
            <Route 
              path="/home" 
              element={<HomePage />}
            />
            <Route 
              path="/workouts" 
              element={<WorkoutPage/>}
            />
            <Route 
              path="*"
              element={<NotFound />}
            />
          </Routes>
      </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
