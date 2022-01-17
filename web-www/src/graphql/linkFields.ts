import { graphql } from 'gatsby';

export const linkFields = graphql`
  fragment linkFields on SanityLink {
    buttonHref
    buttonDoc {
      href
    }
  }
`;
