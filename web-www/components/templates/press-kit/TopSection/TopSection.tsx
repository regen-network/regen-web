import BackgroundSection from '@/components/organisms/BackgroundSection/BackgroundSection';
import { PressKitTopSectionFieldsFragment } from '@/generated/sanity-graphql';
import topSectionImage from '@/public/images/press-kit/press-kit-top-bg.jpg';

type Props = {
  topSectionData?: PressKitTopSectionFieldsFragment['topSection'];
};

const TopSection = ({ topSectionData }: Props): JSX.Element => {
  return (
    <BackgroundSection
      linearGradient="linear-gradient(180deg, #FFF9EE 2.02%, rgba(255, 249, 238, 0) 37.98%), linear-gradient(209.83deg, rgba(250, 235, 209, 0.9) 11.05%, rgba(125, 201, 191, 0.9) 43.17%, rgba(81, 93, 137, 0.9) 75.29%)"
      header={topSectionData?.title}
      body={topSectionData?.body}
      imageSrc={topSectionImage}
    />
  );
};

export default TopSection;
