import { InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';

import { BackgroundImage } from '@/components/organisms/BackgroundImage/BackgroundImage';
import AwardsSection from '@/components/templates/press-kit/AwardsSection/AwardsSection';
import PressKitConnectSection from '@/components/templates/press-kit/ConnectSection/ConnectSection';
import EnableSection from '@/components/templates/press-kit/EnableSection/EnableSection';
import FeaturedSection from '@/components/templates/press-kit/FeaturedSection/FeaturedSection';
import LogosSection from '@/components/templates/press-kit/LogosSection/LogosSection';
import PhotosSection from '@/components/templates/press-kit/PhotosSection/PhotosSection';
import TimelineSection from '@/components/templates/press-kit/TimelineSection/TimelineSection';
import TitleDescriptionSection from '@/components/templates/press-kit/TitleDescriptionSection/TitleDescriptionSection';
import TopSection from '@/components/templates/press-kit/TopSection/TopSection';
import {
  PressKitPageDocument,
  PressKitPageQuery,
} from '@/generated/sanity-graphql';
import { sanityClient } from '@/lib/clients/sanityClient';
import pressKitTopoBg from '@/public/images/press-kit/press-kit-topo-bg.jpg';

export default function PressKitPage({
  pressKitData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const pressKitPage = pressKitData.data.allPresskitPage[0];
  const topSection = pressKitPage.topSection;
  const titleDescriptionSection = pressKitPage.titleDescriptionSection;
  const enableSection = pressKitPage.enableSection;
  const timelineSection = pressKitPage.timelineSection;
  const featuredSection = pressKitPage.featuredSection;
  const awardsSection = pressKitPage.awardsSection;
  const logosSection = pressKitPage.logosSection;
  const photosSection = pressKitPage.photosSection;

  return (
    <>
      <NextSeo
        title="Press Kit"
        description="Regen Network aligns economics with ecology to drive regenerative land management."
      />
      <TopSection topSectionData={topSection} />
      <TitleDescriptionSection
        titleDescriptionSectionData={titleDescriptionSection}
      />
      <EnableSection enableSectionData={enableSection} />
      <TimelineSection timelineSectionData={timelineSection} />
      <BackgroundImage src={pressKitTopoBg}>
        <FeaturedSection featuredSectionData={featuredSection} />
        <AwardsSection awardsSectionData={awardsSection} />
        <LogosSection logosSectionData={logosSection} />
      </BackgroundImage>
      <PressKitConnectSection connectSectionData={pressKitPage} />
      <PhotosSection photosSectionData={photosSection} />
    </>
  );
}

export const getStaticProps = async () => {
  const [pressKitData] = await Promise.all([
    sanityClient.query<PressKitPageQuery>({
      query: PressKitPageDocument,
    }),
  ]);

  return {
    props: { pressKitData },
  };
};
