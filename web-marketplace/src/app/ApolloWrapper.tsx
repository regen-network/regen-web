'use client';

import { ApolloNextAppProvider } from '@apollo/client-integration-nextjs';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import {
  ApolloLink,
  DefaultOptions,
  FetchResult,
  HttpLink,
  Observable,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';
import { QueryClient } from '@tanstack/react-query';

import { apiUri, indexerApiUri } from 'lib/apiUri';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { GET_CSRF_QUERY_KEY } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery.constants';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';

// have a function to create a client for you
export function makeClient(reactQueryClient: QueryClient) {
  const httpLink = new HttpLink({
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    uri: `${apiUri}/marketplace/v1/graphql`,
    // you can disable result caching here if you want to
    // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
    fetchOptions: {
      // you can pass additional options that should be passed to `fetch` here,
      // e.g. Next.js-related `fetch` options regarding caching and revalidation
      // see https://nextjs.org/docs/app/api-reference/functions/fetch#fetchurl-options
    },
    credentials: 'include',
    // you can override the default `fetchOptions` on a per query basis
    // via the `context` property on the options passed as a second argument
    // to an Apollo Client data fetching hook, e.g.:
    // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { ... }}});
  });

  const indexerHttpLink = new HttpLink({
    uri: `${indexerApiUri}/graphql`,
  });

  // https://www.apollographql.com/docs/react/api/link/apollo-link-context/#overview
  const authLink = setContext(async (_, { headers }) => {
    const csrfToken = await getFromCacheOrFetch({
      query: getCsrfTokenQuery({}),
      reactQueryClient,
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
    // eslint-disable-next-line lingui/no-unlocalized-strings
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

  // use the `ApolloClient` from "@apollo/client-integration-nextjs"
  return new ApolloClient({
    // use the `InMemoryCache` from "@apollo/client-integration-nextjs"
    cache: new InMemoryCache(),
    link: splitLink,
    defaultOptions,
  });
}

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const reactQueryClient = useQueryClient();
  useQuery(getCsrfTokenQuery({}));

  return (
    <ApolloNextAppProvider makeClient={() => makeClient(reactQueryClient)}>
      {children}
    </ApolloNextAppProvider>
  );
}
