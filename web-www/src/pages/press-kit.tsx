import React from 'react';

import SEO from '../components/seo';
import TopSection from '../sections/press-kit//TopSection';
import TitleDescriptionSection from '../sections/press-kit/TitleDescriptionSection';
import EnableSection from '../sections/press-kit/EnableSection';

const PressKitPage = (): JSX.Element => {
  return (
    <>
      <SEO title="Press Kit" />
      <TopSection />
      <TitleDescriptionSection />
      <EnableSection />
      {/* <ConnectSection /> */}
    </>
  );
};

export default PressKitPage;
