import React from 'react';

import SEO from '../components/seo';
import HomeFoldSection from '../sections/home/fold-section';
import MarketplaceSection from '../sections/home/marketplace-section';
import HomeLedger from '../sections/home/ledger-section';
import HomeValuesSection from '../sections/home/values-section';
import CarbonPlusSection from '../sections/home/carbonplus-section';
import EmailSubmitSection from '../sections/shared/EmailSubmitSection';

const IndexPage = (): JSX.Element => {
  return (
    <>
      <SEO title="Home" mailerlite />
      <HomeFoldSection />
      <MarketplaceSection />
      <EmailSubmitSection />
      <CarbonPlusSection />
      <HomeLedger />
      <HomeValuesSection />
    </>
  );
};

export default IndexPage;
