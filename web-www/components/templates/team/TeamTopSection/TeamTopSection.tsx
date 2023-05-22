import { teamTopSectionGradient } from './TeamTopSection.styles';

import BackgroundSection from '@/components/organisms/BackgroundSection/BackgroundSection';
import { TeamTopSectionFieldsFragment } from '@/generated/sanity-graphql';
import peopleWalkingOutlineImage from '@/public/images/team/people-walking-outline.jpg';

type Props = {
  topSectionData?: TeamTopSectionFieldsFragment['topSection'];
};

const TeamTopSection = ({ topSectionData }: Props): JSX.Element => {
  return (
    <BackgroundSection
      linearGradient={teamTopSectionGradient}
      header={topSectionData?.title}
      body={topSectionData?.body}
      imageSrc={peopleWalkingOutlineImage}
    />
  );
};

export default TeamTopSection;
