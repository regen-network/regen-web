import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { useAuth0 } from './react-auth0-spa';

interface AuthApolloProviderProps {
  children?: any;
}

export const AuthApolloProvider = ({ children }: AuthApolloProviderProps): any => {
  const { loading, isAuthenticated, getTokenSilently } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }
  const apiUri = process.env.REACT_APP_API_URI || 'http://localhost:5000';
  const client = new ApolloClient({
    uri: `${apiUri}/graphql`,
    request: async operation => {
      // Get token or get refreshed token
      const token = isAuthenticated ? await getTokenSilently() : null;
      if (token) {
        operation.setContext({
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
      }
    },
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
