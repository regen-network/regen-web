import React from 'react';

import SEO from '../components/seo';
import TopSection from '../sections/land-stewards/TopSection';
import ImageItemsSection from '../sections/land-stewards/ImageItemsSection';
import JoinFarmersSection from '../sections/land-stewards/JoinFarmersSection';
import PracticesOutcomesSection from '../sections/land-stewards/PracticesOutcomesSection';
import MoreQuestionsSection from '../sections/land-stewards/MoreQuestionsSection';
import FeaturedSection from '../sections/shared/FeaturedSection';

const LandStewardsPage = (): JSX.Element => {

  return (
    <>
      <SEO title="For Land Stewards" />
      <TopSection />
      <ImageItemsSection />
      <JoinFarmersSection />
      <PracticesOutcomesSection />
      {/* TODO: add "How it works" section here */}
      <FeaturedSection />
      <MoreQuestionsSection />
    </>
  );
};

export default LandStewardsPage;
