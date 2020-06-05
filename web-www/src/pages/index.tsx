import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import styled from 'styled-components';
import StyledComponentsWrapper from '../components/styledComponentsWrapper';
import HomeFoldSection from '../sections/home-fold-section';
import MarketplaceSection from '../sections/marketplace-section';

const IndexPage = (): JSX.Element => (
  <StyledComponentsWrapper>
    <Layout color="#fff">
      <SEO title="Home" />
      <HomeFoldSection></HomeFoldSection>
      <MarketplaceSection></MarketplaceSection>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  </StyledComponentsWrapper>
);

export default IndexPage;
