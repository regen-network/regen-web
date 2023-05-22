import { Box } from '@mui/material';

import { TeamSection } from '@/components/organisms/TeamSection/TeamSection';
import {
  RegenTeamMember,
  TeamAdvisorSectionFieldsFragment,
} from '@/generated/sanity-graphql';

type Props = {
  advisorSectionData?: TeamAdvisorSectionFieldsFragment['advisorSection'];
};

/** Note: this shows as the Board of Directions section on the site  */
const AdvisorSection = ({ advisorSectionData }: Props): JSX.Element => {
  const teamMembers = advisorSectionData?.members
    ? advisorSectionData.members
    : [];
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
        bgUrl="/images/team/team-bg.jpg"
        members={teamMembers as RegenTeamMember[]}
        title={advisorSectionData?.title ?? ''}
      />
    </Box>
  );
};

export default AdvisorSection;
