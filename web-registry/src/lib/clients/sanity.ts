import { ApolloClient, InMemoryCache } from '@apollo/client';

// Alternative Apollo client for querying data from Sanity (CMS)
const client = new ApolloClient({
  uri: `https://${process.env.REACT_APP_SANITY_PROJECT_ID}.api.sanity.io/v1/graphql/${process.env.REACT_APP_SANITY_DATASET}/${process.env.REACT_APP_SANITY_TAG}`,
  cache: new InMemoryCache(),
});

export { client };
