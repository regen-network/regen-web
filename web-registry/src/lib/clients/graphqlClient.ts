import { ApolloClient, InMemoryCache } from '@apollo/client';

import getApiUri from 'lib/apiUri';

export const graphqlClient = new ApolloClient({
  uri: `${getApiUri()}/graphql`,
  cache: new InMemoryCache(),
});
