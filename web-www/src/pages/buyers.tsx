import React from 'react';

import SEO from '../components/seo';
import TopSection from '../sections/buyers/top-section';
import ApproachSection from '../sections/buyers/approach-section';

const BuyersPage = (): JSX.Element => (
  <>
    <SEO title="For Buyers" />
    <TopSection />
    <ApproachSection />
  </>
);

export default BuyersPage;
