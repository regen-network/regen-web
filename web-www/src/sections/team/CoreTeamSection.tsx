import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import {
  SanityRegenTeamMember,
  TeamCoreTeamSectionQuery,
} from '../../generated/graphql';
import { TeamSection } from '../../components/TeamSection';

const query = graphql`
  query teamCoreTeamSection {
    background: file(relativePath: { eq: "team-bg.png" }) {
      publicURL
    }
    sanityTeamPage {
      coreSection {
        ...teamSectionFields
      }
    }
  }
`;

const CoreTeamSection = (): JSX.Element => {
  const { background, sanityTeamPage } =
    useStaticQuery<TeamCoreTeamSectionQuery>(query);
  const data = sanityTeamPage?.coreSection;
  const teamMembers = !!data?.members ? data.members : [];
  return (
    <TeamSection
      bgUrl={background?.publicURL || ''}
      members={teamMembers as SanityRegenTeamMember[]}
      title={data?.title || ''}
    />
  );
};

export default CoreTeamSection;
