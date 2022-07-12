import { graphql } from 'gatsby';

export const teamSectionFields = graphql`
  fragment teamMemberFields on SanityRegenTeamMember {
    name
    title
    description
    image {
      ...ImageWithPreview
    }
    linkedinUrl
    twitterUrl
    githubUrl
  }
`;
