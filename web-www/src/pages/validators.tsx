import React from 'react';
import { useStaticQuery, graphql, PageProps } from 'gatsby';

import TopSection from '../sections/validators/TopSection';
import WhatSection from '../sections/validators/WhatSection';
import WhoSection from '../sections/validators/WhoSection';
import WhySection from '../sections/validators/WhySection';
import ConnectSection from '../sections/validators/ConnectSection';
import SEO from '../components/seo';

const ValidatorsPage: React.FC<PageProps> = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      seoImage: file(relativePath: { eq: "validators-top-bg.png" }) {
        publicURL
      }
    }
  `);
  return (
    <>
      <SEO title="Validators" location={location} imageUrl={data.seoImage.publicURL} />
      <TopSection />
      <WhatSection />
      <WhoSection />
      <ConnectSection />
      <WhySection />
    </>
  );
};

export default ValidatorsPage;
