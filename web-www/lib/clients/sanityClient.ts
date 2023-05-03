import { ApolloClient, InMemoryCache } from '@apollo/client';

const sanityClient = new ApolloClient({
  ssrMode: true,
  uri: `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/graphql/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${process.env.NEXT_PUBLIC_SANITY_TAG}`,
  cache: new InMemoryCache(),
});

export { sanityClient };
