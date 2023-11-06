import {
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  DefaultOptions,
  FetchResult,
  InMemoryCache,
  Observable,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { ApolloClientFactory } from 'lib/clients/apolloClientFactory';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { GET_CSRF_QUERY_KEY } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery.constants';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';

import { apiUri, indexerApiUri } from './lib/apiUri';

interface AuthApolloProviderProps {
  apolloClientFactory: ApolloClientFactory;
  children?: any;
}

export const AuthApolloProvider = ({
  apolloClientFactory,
  children,
}: AuthApolloProviderProps): any => {
  const reactQueryClient = useQueryClient();
  useQuery(getCsrfTokenQuery({}));

  // https://www.apollographql.com/docs/react/networking/authentication
  const httpLink = createHttpLink({
    uri: `${apiUri}/marketplace/v1/graphql`,
    credentials: 'include',
  });

  const indexerHttpLink = createHttpLink({
    uri: `${indexerApiUri}/graphql`,
  });

  // https://www.apollographql.com/docs/react/api/link/apollo-link-context/#overview
  const authLink = setContext(async (_, { headers }) => {
    const csrfToken = await getFromCacheOrFetch({
      query: getCsrfTokenQuery({}),
      reactQueryClient: reactQueryClient,
    });

    return {
      headers: {
        ...headers,
        'X-CSRF-TOKEN': csrfToken,
      },
    };
  });

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

  const errorLink = onError(({ operation, networkError, forward }) => {
    if (networkError && networkError.message.includes('status code 403')) {
      const observable = new Observable<FetchResult<Record<string, any>>>(
        observer => {
          (async () => {
            try {
              await reactQueryClient.invalidateQueries({
                queryKey: [GET_CSRF_QUERY_KEY],
              });
              // trigger a call to get a new CSRF token and refill the cache earlier
              await getFromCacheOrFetch({
                query: getCsrfTokenQuery({}),
                reactQueryClient: reactQueryClient,
              });

              const subscriber = {
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              };

              forward(operation).subscribe(subscriber);
            } catch (err) {
              observer.error(err);
            }
          })();
        },
      );

      return observable;
    }
  });

  const mainLink = authLink.concat(httpLink);

  const splitLink = split(
    ({ operationName }) => {
      // All graphql queries for the indexer must start with `Indexer` prefix
      // in order for the apollo client to pick up the good endpoint
      return operationName.startsWith('Indexer');
    },
    indexerHttpLink,
    ApolloLink.from([errorLink, mainLink]),
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
