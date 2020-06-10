import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import styled from 'styled-components';
import StyledComponentsWrapper from '../components/styledComponentsWrapper';

const IndexPage = (): JSX.Element => (
  <StyledComponentsWrapper>
    <Layout>
      <SEO title="Home" />
      <h4>Buyers</h4>
    </Layout>
  </StyledComponentsWrapper>
);

export default IndexPage;
