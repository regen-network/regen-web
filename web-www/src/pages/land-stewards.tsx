import React from 'react';

import SEO from '../components/seo';
import TopSection from '../sections/land-stewards/TopSection';
import ImageItemsSection from '../sections/land-stewards/ImageItemsSection';


const LandStewardsPage = (): JSX.Element => {

  return (
    <>
      <SEO title="For Land Stewards" />
      <TopSection />
      <ImageItemsSection />
    </>
  );
};

export default LandStewardsPage;
