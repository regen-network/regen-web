import { ApolloClient, InMemoryCache } from '@apollo/client';
import imageUrlBuilder from '@sanity/image-url';

// client for querying data from Sanity (CMS)
const client = new ApolloClient({
  uri: `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v1/graphql/${process.env.SANITY_DATASET}/default`,
  cache: new InMemoryCache(),
});

const imgBuilder = imageUrlBuilder({
  projectId: `${process.env.SANITY_PROJECT_ID}`,
  dataset: `${process.env.SANITY_DATASET}`,
});

export { client, imgBuilder };
