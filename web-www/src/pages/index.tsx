import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import StyledComponentsWrapper from '../components/styledComponentsWrapper';
import HomeFoldSection from '../sections/home-fold-section';
import MarketplaceSection from '../sections/marketplace-section';
import { useTheme } from '@material-ui/core/styles';

const IndexPage = (): JSX.Element => {
  const theme = useTheme();
  return (
    <StyledComponentsWrapper>
      <Layout color={theme.palette.primary.main}>
        <SEO title="Home" />
        <HomeFoldSection></HomeFoldSection>
        <MarketplaceSection></MarketplaceSection>
        <Link to="/page-2/">Go to page 2</Link>
      </Layout>
    </StyledComponentsWrapper>
  );
};

export default IndexPage;
