import { ApolloClient, InMemoryCache } from '@apollo/client';

// Alternative Apollo client for querying data from Sanity (CMS)
const client = new ApolloClient({
  uri: `https://${
    import.meta.env.VITE_SANITY_PROJECT_ID
  }.api.sanity.io/v1/graphql/${import.meta.env.VITE_SANITY_DATASET}/${
    import.meta.env.VITE_SANITY_TAG
  }`,
  cache: new InMemoryCache(),
});

export { client };
