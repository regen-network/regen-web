import { graphql } from 'gatsby';

export const teamMemberFields = graphql`
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
