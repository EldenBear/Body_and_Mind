import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import WorkoutPage from './pages/WorkoutPage';


const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

const theme = extendTheme({
  colors: {
    secondary: {
      50: "#f7f8ed",
      100: "#f7f8ed",
      500: "#f7f8ed",
    }
  }
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={< Login />}
            />
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
