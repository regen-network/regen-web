import { ApolloClient, InMemoryCache } from '@apollo/client';

// Alternative Apollo client for querying data from Sanity (CMS)
const client = new ApolloClient({
  uri: `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/graphql/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${process.env.NEXT_PUBLIC_SANITY_TAG}`,
  cache: new InMemoryCache(),
});

export { client };
