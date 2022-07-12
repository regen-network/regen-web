import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { TeamSection } from '../../components/TeamSection';
import {
  SanityRegenTeamMember,
  TeamAdvisorSectionQuery,
} from '../../generated/graphql';

const query = graphql`
  query teamAdvisorSection {
    background: file(relativePath: { eq: "team-bg.png" }) {
      publicURL
    }
    sanityTeamPage {
      advisorSection {
        ...teamSectionFields
      }
    }
  }
`;

const AdvisorSection = (): JSX.Element => {
  const { background, sanityTeamPage } =
    useStaticQuery<TeamAdvisorSectionQuery>(query);
  const data = sanityTeamPage?.advisorSection;
  const teamMembers = !!data?.members ? data.members : [];
  return (
    <TeamSection
      bgUrl={background?.publicURL || ''}
      members={teamMembers as SanityRegenTeamMember[]}
      title={data?.title || ''}
    />
  );
};

export default AdvisorSection;
