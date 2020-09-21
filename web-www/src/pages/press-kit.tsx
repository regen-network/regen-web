import React from 'react';

import SEO from '../components/seo';
import TopSection from '../sections/press-kit//TopSection';
import TitleDescriptionSection from '../sections/press-kit/TitleDescriptionSection';
import EnableSection from '../sections/press-kit/EnableSection';
import TimelineSection from '../sections/press-kit/TimelineSection';
import TeamSection from '../sections/press-kit/TeamSection';

const PressKitPage = (): JSX.Element => {
  return (
    <>
      <SEO title="Press Kit" />
      <TopSection />
      <TitleDescriptionSection />
      <EnableSection />
      <TimelineSection />
      <TeamSection />
      {/* <ConnectSection /> */}
    </>
  );
};

export default PressKitPage;
