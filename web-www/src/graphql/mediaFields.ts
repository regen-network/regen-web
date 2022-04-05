import { graphql } from 'gatsby';

export const mediaFields = graphql`
  fragment mediaFields on SanityMedia {
    title
    author
    date
    image {
      ...customImageFields
    }
    href
    type
  }
`;
