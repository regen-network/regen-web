import React from 'react';
import { Link } from 'gatsby';

import SEO from '../components/seo';
import HomeFoldSection from '../sections/home-fold-section';
import MarketplaceSection from '../sections/home-marketplace-section';
import EmailSubmitSection from '../sections/shared-email-submit-section';
import HomeValuesSection from '../sections/home-values-section';

const IndexPage = (): JSX.Element => {
  return (
    <>
      <SEO title="Home" />
      <HomeFoldSection></HomeFoldSection>
      <MarketplaceSection></MarketplaceSection>
      <EmailSubmitSection />
      <HomeValuesSection></HomeValuesSection>
    </>
  );
};

export default IndexPage;
