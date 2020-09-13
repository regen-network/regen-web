import React from 'react';

import SEO from '../components/seo';
import TopSection from '../sections/developers/TopSection';
import LedgerSection from '../sections/developers/LedgerSection';
import TestnetSection from '../sections/developers/TestnetSection';

const DevelopersPage = (): JSX.Element => {
  return (
    <>
      <SEO title="For Developers" />
      <TopSection />
      <LedgerSection />
      <TestnetSection />
    </>
  );
};

export default DevelopersPage;
