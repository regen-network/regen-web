import React from 'react';

import SEO from '../components/seo';
import TopSection from '../sections/land-stewards/TopSection';
import ImageItemsSection from '../sections/land-stewards/ImageItemsSection';
import JoinFarmersSection from '../sections/land-stewards/JoinFarmersSection';
import PracticesOutcomesSection from '../sections/land-stewards/PracticesOutcomesSection';


const LandStewardsPage = (): JSX.Element => {

  return (
    <>
      <SEO title="For Land Stewards" />
      <TopSection />
      <ImageItemsSection />
      <JoinFarmersSection />
      <PracticesOutcomesSection />
    </>
  );
};

export default LandStewardsPage;
