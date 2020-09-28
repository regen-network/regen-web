import React from 'react';

import TopSection from '../sections/resources/TopSection';
import RegistrySection from '../sections/resources/RegistrySection';
import LedgerSection from '../sections/resources/LedgerSection';
import SEO from '../components/seo';

interface props {
  location: object;
}

const ResourcesPage = ({ location }: props): JSX.Element => {
  return (
    <>
      <SEO
        description="Learn more about the ins and outs of how the Regen Ledger and Regen Registry function."
        title="Resources"
        location={location}
      />
      <TopSection />
      <RegistrySection />
      <LedgerSection />
    </>
  );
};

export default ResourcesPage;
