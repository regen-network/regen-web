import React from 'react';

import TopSection from '../sections/science/TopSection';
import TitleDescriptionSection from '../sections/science/TitleDescriptionSection';
import SEO from '../components/seo';

const SciencePage = (): JSX.Element => {
  return (
    <>
      <SEO title="Science" />
      <TopSection />
      <TitleDescriptionSection />
    </>
  );
};

export default SciencePage;
