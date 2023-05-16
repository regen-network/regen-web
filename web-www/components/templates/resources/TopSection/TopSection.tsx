import { resourcesTopSectionGradient } from './TopSection.styles';

import BackgroundSection from '@/components/organisms/BackgroundSection/BackgroundSection';
import { ResourcesTopSectionFieldsFragment } from '@/generated/sanity-graphql';

type Props = {
  topSectionData?: ResourcesTopSectionFieldsFragment['topSection'];
};

const TopSection = ({ topSectionData }: Props): JSX.Element => {
  return (
    <BackgroundSection
      linearGradient={resourcesTopSectionGradient}
      header={topSectionData?.title}
      body={topSectionData?.body}
      imageSrc="/images/resources/resources-top-image.jpg"
    />
  );
};

export default TopSection;
