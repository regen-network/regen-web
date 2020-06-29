import React from 'react';

import SEO from '../components/seo';
import TopSection from '../sections/buyers/TopSection';
import ApproachSection from '../sections/buyers/ApproachSection';
import InvestingSection from '../sections/buyers/InvestingSection';

const BuyersPage = (): JSX.Element => (
  <>
    <SEO title="For Buyers" />
    <TopSection />
    <ApproachSection />
    <InvestingSection />
  </>
);

export default BuyersPage;
