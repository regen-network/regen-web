import { HttpLink } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/client-integration-nextjs';

import { makeClient } from './ApolloWrapper';

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return makeClient();
});
