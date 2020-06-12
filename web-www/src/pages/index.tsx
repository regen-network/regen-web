import React from 'react';
import { Link } from 'gatsby';

import SEO from '../components/seo';
import HomeFoldSection from '../sections/home-fold-section';
import MarketplaceSection from '../sections/marketplace-section';

const IndexPage = (): JSX.Element => {
  return (
    <>
      <SEO title="Home" />
      <HomeFoldSection></HomeFoldSection>
      <MarketplaceSection></MarketplaceSection>
      <Link to="/page-2/">Go to page 2</Link>
    </>
  );
};

export default IndexPage;
