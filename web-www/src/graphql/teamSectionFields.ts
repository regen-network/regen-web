import { graphql } from 'gatsby';

export const teamSectionFields = graphql`
  fragment teamSectionFields on SanityTeamSection {
    title
    members {
      name
      title
      description
      image {
        asset {
          url
          extension
        }
      }
      linkedinUrl
      twitterUrl
      githubUrl
    }
  }
`;
