import { graphql } from 'gatsby';

export const buttonFields = graphql`
  fragment buttonFields on SanityButton {
    buttonText
    buttonLink {
      ...linkFields
    }
    buttonModal
    buttonBlankTarget
  }
`;
