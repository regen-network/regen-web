import React, { useCallback, useEffect } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from '@auth0/auth0-react';

import getApiUri from './lib/apiUri';

interface AuthApolloProviderProps {
  children?: any;
}

export const AuthApolloProvider = ({
  children,
}: AuthApolloProviderProps): any => {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } =
    useAuth0();
  const apiUri = getApiUri();

  const login = useCallback(async (): Promise<void> => {
    try {
      if (isAuthenticated && user) {
        const token = await getAccessTokenSilently();
        try {
          await fetch(`${apiUri}/auth/login`, {
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

  const httpLink = new HttpLink({ uri: `${apiUri}/graphql` });

  const withToken = setContext(async () => {
    // needed on first login
    // TODO find more efficient solution at Auth0Provider level
    await login();
    // Get token or get refreshed token
    const token = isAuthenticated ? await getAccessTokenSilently() : null;
    return { token };
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    const { token } = operation.getContext();
    operation.setContext(() => ({
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    }));
    return forward(operation);
  });

  const link = ApolloLink.from([withToken, authMiddleware.concat(httpLink)]);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
