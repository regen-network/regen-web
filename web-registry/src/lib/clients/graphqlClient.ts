import { ApolloClient, InMemoryCache } from '@apollo/client';

import { apiUri } from 'lib/apiUri';

export const graphqlClient = new ApolloClient({
  uri: `${apiUri}/graphql`,
  cache: new InMemoryCache(),
});
