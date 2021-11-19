import { graphql } from 'gatsby';

export const fluidImage = graphql`
  fragment fluidImageFields on SanityCustomImage {
    imageAlt
    image {
      asset {
        fluid {
          ...GatsbySanityImageFluid
        }
      }
    }
  }
`;

export const fluidImageWebP = graphql`
  fragment fluidImageWebPFields on SanityCustomImage {
    imageAlt
    image {
      asset {
        fluid {
          ...GatsbySanityImageFluid_withWebp
        }
      }
    }
  }
`;
