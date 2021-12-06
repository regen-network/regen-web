import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import TeamSection from 'web-components/lib/components/team-section';
import { TeamAdvisorSectionQuery } from '../../generated/graphql';
import { TeamItemProps } from 'web-components/lib/components/team-item';

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
  const { background, sanityTeamPage } = useStaticQuery<TeamAdvisorSectionQuery>(query);
  const data = sanityTeamPage?.advisorSection;
  return (
    <TeamSection
      bgUrl={background?.publicURL || ''}
      members={(data?.members || []).map(m => ({ imgUrl: m?.image?.asset?.url, ...m } as TeamItemProps))}
      title={data?.title || ''}
    />
  );
};

export default AdvisorSection;
