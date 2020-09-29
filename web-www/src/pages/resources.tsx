import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import TopSection from '../sections/resources/TopSection';
// import RegistrySection from '../sections/resources/RegistrySection';
import LedgerSection from '../sections/resources/LedgerSection';
import SEO from '../components/seo';

interface props {
  location: object;
}

const ResourcesPage = ({ location }: props): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      seoImage: file(relativePath: { eq: "resources-ledger-whitepaper-image.jpg" }) {
        publicURL
      }
    }
  `);
  return (
    <>
      <SEO
        description="Learn more about the ins and outs of how the Regen Ledger and Regen Registry function."
        title="Resources"
        location={location}
        imageUrl={data.seoImage.publicURL}
      />
      <TopSection />
      {/* <RegistrySection /> */}
      <LedgerSection />
    </>
  );
};

export default ResourcesPage;
