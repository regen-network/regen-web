import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

import { apiUri } from 'lib/apiUri';

export const graphqlClient = new ApolloClient({
  // uri: `${apiUri}/graphql`,
  link: createHttpLink({
    uri: `${apiUri}/graphql`,
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
});
