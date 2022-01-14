import { graphql } from 'gatsby';

export const fluidSanityImage = graphql`
  fragment fluidSanityImageFields on SanityImage {
    asset {
      fluid {
        ...GatsbySanityImageFluid
      }
    }
  }
`;

export const fluidSanityImageWebP = graphql`
  fragment fluidSanityImageFields_withWebp on SanityImage {
    asset {
      fluid {
        ...GatsbySanityImageFluid_withWebp
      }
    }
  }
`;

export const fluidImage = graphql`
  fragment fluidCustomImageFields on SanityCustomImage {
    imageAlt
    image {
      ...fluidSanityImageFields
    }
  }
`;

export const fluidImageWebP = graphql`
  fragment fluidCustomImageFields_withWebp on SanityCustomImage {
    imageAlt
    image {
      ...fluidSanityImageFields_withWebp
    }
  }
`;
