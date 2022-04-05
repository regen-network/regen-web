import { graphql } from 'gatsby';

export const customImage = graphql`
  fragment customImageFields on SanityCustomImage {
    imageAlt
    imageHref
    image {
      asset {
        url
      }
      ...ImageWithPreview
    }
  }
`;
