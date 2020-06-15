import React from 'react';
import { Link } from 'gatsby';

import SEO from '../components/seo';
import HomeFoldSection from '../sections/home-fold-section';
import MarketplaceSection from '../sections/marketplace-section';
import EmailSubmitSection from '../sections/shared-email-submit-section';
import HomeValues from '../sections/home-values';

const IndexPage = (): JSX.Element => {
  const theme = useTheme();
  return (
    <>
      <SEO title="Home" />
      <HomeFoldSection></HomeFoldSection>
      <MarketplaceSection></MarketplaceSection>
      <EmailSubmitSection />
      <HomeValues></HomeValues>
      <Link to="/page-2/">Go to page 2</Link>
    </>
  );
};

export default IndexPage;
