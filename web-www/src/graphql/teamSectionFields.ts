import { graphql } from 'gatsby';

export const teamSectionFields = graphql`
  fragment teamSectionFields on SanityTeamSection {
    title
    members {
      ...teamMemberFields
    }
  }
`;
