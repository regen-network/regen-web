import React from 'react';

import TopSection from '../sections/resources/TopSection';
import RegistrySection from '../sections/resources/RegistrySection';
import LedgerSection from '../sections/resources/LedgerSection';
import SEO from '../components/seo';

const ResourcesPage = (): JSX.Element => {
  return (
    <>
      <SEO title="Resources" />
      <TopSection />
      <RegistrySection />
      <LedgerSection />
    </>
  );
};

export default ResourcesPage;
