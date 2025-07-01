import { HttpLink } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/client-integration-nextjs';

import { apiUri } from 'lib/apiUri';

export const { getClient } = registerApolloClient(async () => {
  const resp = await fetch(`${apiUri}/marketplace/v1/csrfToken`, {
    method: 'GET',
    credentials: 'include',
  });
  const csrfCookie = resp.headers.get('set-cookie');
  const { token: csrfToken } = await resp.json();

  const httpLink = new HttpLink({
    uri: `${apiUri}/marketplace/v1/graphql`,
    headers: {
      'X-CSRF-TOKEN': csrfToken,
      Cookie: csrfCookie ?? '', // pass along the CSRF cookie manually
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    fetch,
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  });
});

export const { getClient: getSanityClient } = registerApolloClient(async () => {
  return new ApolloClient({
    uri: `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/graphql/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${process.env.NEXT_PUBLIC_SANITY_TAG}`,
    cache: new InMemoryCache(),
  });
});
