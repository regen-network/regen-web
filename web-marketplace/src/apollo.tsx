import {
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  DefaultOptions,
  InMemoryCache,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useQuery } from '@tanstack/react-query';

import { ApolloClientFactory } from 'lib/clients/apolloClientFactory';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';

import { apiUri, indexerApiUri } from './lib/apiUri';

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
    uri: `${apiUri}/marketplace/v1/graphql`,
    credentials: 'include',
  });

  const indexerHttpLink = createHttpLink({
    uri: `${indexerApiUri}/graphql`,
  });

  // https://www.apollographql.com/docs/react/api/link/apollo-link-context/#overview
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      'X-CSRF-TOKEN': query.data,
    },
  }));

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

  const mainLink = authLink.concat(httpLink);

  const splitLink = split(
    ({ operationName }) => {
      // All graphql queries for the indexer must start with `Indexer` prefix
      // in order for the apollo client to pick up the good endpoint
      return operationName.startsWith('Indexer');
    },
    indexerHttpLink,
    ApolloLink.from([mainLink]),
  );

  apolloClientFactory.prepare({
    cache: new InMemoryCache(),
    link: splitLink,
    defaultOptions,
  });

  return (
    <ApolloProvider client={apolloClientFactory.getClient()}>
      {children}
    </ApolloProvider>
  );
};
