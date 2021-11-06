import { graphql } from 'gatsby';

export const callToActionFields = graphql`
  fragment callToActionFields on SanityCallToAction {
    caption
    image {
      ...ImageWithPreview
    }
    header
    description
    linkText
    linkUrl
  }
`;
