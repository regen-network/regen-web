import { graphql } from 'gatsby';

export const teamSectionFields = graphql`
  fragment teamMemberFields on SanityRegenTeamMember {
    name
    title
    description
    image {
      asset {
        url
      }
    }
    linkedinUrl
    twitterUrl
    githubUrl
  }
`;
