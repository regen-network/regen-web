import { teamTopSectionGradient } from './TeamTopSection.styles';

import BackgroundSection from '@/components/organisms/BackgroundSection/BackgroundSection';
import { TeamTopSectionFieldsFragment } from '@/generated/sanity-graphql';

type Props = {
  topSectionData?: TeamTopSectionFieldsFragment['topSection'];
};

const TeamTopSection = ({ topSectionData }: Props): JSX.Element => {
  return (
    <BackgroundSection
      linearGradient={teamTopSectionGradient}
      header={topSectionData?.title}
      body={topSectionData?.body}
      imageSrc="/images/team/people-walking-outline.jpg"
    />
  );
};

export default TeamTopSection;
