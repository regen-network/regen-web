import React from 'react';
import { Box } from '@mui/material';
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

/** Note: this shows as the Board of Directions section on the site  */
const AdvisorSection = (): JSX.Element => {
  const { background, sanityTeamPage } =
    useStaticQuery<TeamAdvisorSectionQuery>(query);
  const data = sanityTeamPage?.advisorSection;
  const teamMembers = data?.members ? data.members : [];
  return (
    <Box
      sx={{
        bgcolor: 'grey.50',
        borderTop: 1,
        borderTopColor: 'info.light',
        borderBottom: 1,
        borderBottomColor: 'info.light',
      }}
    >
      <TeamSection
        bgUrl={background?.publicURL || ''}
        members={teamMembers as SanityRegenTeamMember[]}
        title={data?.title || ''}
      />
    </Box>
  );
};

export default AdvisorSection;
