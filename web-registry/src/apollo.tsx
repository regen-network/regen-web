import React, { useCallback, useEffect } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { useAuth0 } from '@auth0/auth0-react';

import getApiUri from './lib/apiUri';

interface AuthApolloProviderProps {
  children?: any;
}

export const AuthApolloProvider = ({ children }: AuthApolloProviderProps): any => {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const apiUri = getApiUri();

  const login = useCallback(async (): Promise<void> => {
    try {
      if (isAuthenticated && user) {
        const token = await getAccessTokenSilently();
        try {
          await fetch(`${apiUri}/api/login`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
            method: 'POST',
          });
        } catch (e) {}
      }
    } catch (e) {}
  }, [apiUri, getAccessTokenSilently, isAuthenticated, user]);

  useEffect(() => {
    login();
  }, [login]);

  if (isLoading) {
    return <div></div>;
  }
  const client = new ApolloClient({
    uri: `${apiUri}/graphql`,
    request: async operation => {
      try {
        // needed on first login
        // TODO find more efficient solution at Auth0Provider level
        await login();
        // Get token or get refreshed token
        const token = isAuthenticated ? await getAccessTokenSilently() : null;
        if (token) {
          operation.setContext({
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
        }
      } catch (e) {}
    },
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
