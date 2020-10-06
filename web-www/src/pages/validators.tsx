import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import TopSection from '../sections/validators/TopSection';
import WhatSection from '../sections/validators/WhatSection';
import WhoSection from '../sections/validators/WhoSection';
import SEO from '../components/seo';

interface props {
  location: object;
}

const ValidatorsPage = ({ location }: props): JSX.Element => {
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
    </>
  );
};

export default ValidatorsPage;
