import React from 'react';
import { graphql, PageProps, useStaticQuery } from 'gatsby';

import SEO from '../components/seo';
import LedgerSection from '../sections/resources/LedgerSection';
import RegistrySection from '../sections/resources/RegistrySection';
import TopSection from '../sections/resources/TopSection';

const ResourcesPage: React.FC<PageProps> = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      seoImage: file(
        relativePath: { eq: "resources-ledger-whitepaper-image.jpg" }
      ) {
        publicURL
      }
    }
  `);

  return (
    <>
      <SEO
        description="Learn more about the ins and outs of how the Regen Ledger and Regen Marketplace function."
        title="Resources"
        location={location}
        imageUrl={data.seoImage.publicURL}
      />
      <TopSection />
      <RegistrySection />
      <LedgerSection />
    </>
  );
};

export default ResourcesPage;
