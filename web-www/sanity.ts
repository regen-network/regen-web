import { ApolloClient, InMemoryCache } from '@apollo/client';

// Alternative Apollo client for querying data from Sanity (CMS)
const client = new ApolloClient({
  uri: `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v1/graphql/${process.env.SANITY_DATASET}/default`,
  cache: new InMemoryCache(),
});

export { client };
