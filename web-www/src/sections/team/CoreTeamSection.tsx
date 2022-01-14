import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import TeamSection from 'web-components/lib/components/team-section';
import { TeamCoreTeamSectionQuery } from '../../generated/graphql';
import { TeamItemProps } from 'web-components/lib/components/team-item';

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
  const { background, sanityTeamPage } = useStaticQuery<TeamCoreTeamSectionQuery>(query);
  const data = sanityTeamPage?.coreSection;
  return (
    <TeamSection
      alphabetized
      bgUrl={background?.publicURL || ''}
      members={(data?.members || []).map(m => ({ imgUrl: m?.image?.asset?.url, ...m } as TeamItemProps))}
      title={data?.title || ''}
    />
  );
};

export default CoreTeamSection;
