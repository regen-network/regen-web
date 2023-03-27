import {
  ApolloProvider,
  createHttpLink,
  DefaultOptions,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useQuery } from '@tanstack/react-query';

import { ApolloClientFactory } from 'lib/clients/apolloClientFactory';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';

import { apiUri } from './lib/apiUri';

interface AuthApolloProviderProps {
  apolloClientFactory: ApolloClientFactory;
  children?: any;
}

export const AuthApolloProvider = ({
  apolloClientFactory,
  children,
}: AuthApolloProviderProps): any => {
  const query = useQuery(getCsrfTokenQuery({}));

  // https://www.apollographql.com/docs/react/networking/authentication
  const httpLink = createHttpLink({
    uri: `${apiUri}/graphql`,
    credentials: 'include',
  });
  // https://www.apollographql.com/docs/react/api/link/apollo-link-context/#overview
  const authLink = setContext(
    (_, { headers }) =>
      new Promise((success, fail) => {
        if (query.isFetched && query.data) {
          success({
            headers: {
              ...headers,
              'X-CSRF-TOKEN': query.data,
            },
          });
        }
      }),
  );

  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  };

  const link = authLink.concat(httpLink);
  apolloClientFactory.prepare({
    cache: new InMemoryCache(),
    link,
    defaultOptions,
  });
  return (
    <ApolloProvider client={apolloClientFactory.getClient()}>
      {children}
    </ApolloProvider>
  );
};
