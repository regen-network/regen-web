import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { useAuth0 } from '@auth0/auth0-react';

interface AuthApolloProviderProps {
  children?: any;
}

export const AuthApolloProvider = ({ children }: AuthApolloProviderProps): any => {
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
  if (isLoading) {
    return <div></div>;
  }
  const apiUri = process.env.REACT_APP_API_URI || 'http://localhost:5000';
  const client = new ApolloClient({
    uri: `${apiUri}/graphql`,
    request: async operation => {
      // Get token or get refreshed token
      const token = isAuthenticated ? await getAccessTokenSilently() : null;
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
