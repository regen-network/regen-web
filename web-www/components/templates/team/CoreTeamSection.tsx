import { TeamSection } from '@/components/organisms/TeamSection/TeamSection';
import {
  RegenTeamMember,
  TeamCoreSectionFieldsFragment,
} from '@/generated/sanity-graphql';

type Props = {
  coreSectionData?: TeamCoreSectionFieldsFragment['coreSection'];
};

const CoreTeamSection = ({ coreSectionData }: Props): JSX.Element => {
  const teamMembers = !!coreSectionData?.members ? coreSectionData.members : [];
  return (
    <TeamSection
      bgUrl="/images/team/team-bg.jpg"
      members={teamMembers as RegenTeamMember[]}
      title={coreSectionData?.title || ''}
    />
  );
};

export default CoreTeamSection;
