import { graphql } from 'gatsby';

export const callToActionFields = graphql`
  fragment callToActionFields on SanityCallToAction {
    caption
    image {
      ...Image
    }
    header
    description
    linkText
    linkUrl
  }
`;
