import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import styled from 'styled-components';
import StyledComponentsWrapper from '../components/styledComponentsWrapper';
import BackgroundSection from '../components/BackgroundSection';

import EmailSubmitSectiion from '../sections/EmailSubmitSection';

const Section = styled(BackgroundSection)`
  background-image: url('images/image43.jpg');
  background-color: #ccc;
  height: 500px;
  padding: 0px;
`;

const IndexPage = (): JSX.Element => {
  return (
    <StyledComponentsWrapper>
      <Layout>
        <SEO title="Home" />
        <Section></Section>
        <EmailSubmitSectiion></EmailSubmitSectiion>
        <Link to="/page-2/">Go to page 2</Link>
      </Layout>
    </StyledComponentsWrapper>
  );
};

export default IndexPage;
