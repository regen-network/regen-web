import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import styled from 'styled-components';

const Section = styled.section`
  background-color: #ccc;
  height: 500px;
`;

const IndexPage = (): JSX.Element => (
  <Layout>
    <SEO title="Home" />
    <Section></Section>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;
