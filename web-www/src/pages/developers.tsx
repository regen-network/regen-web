import React from 'react';

import SEO from '../components/seo';
import TopSection from '../sections/developers/TopSection';
import LedgerSection from '../sections/developers/LedgerSection';
import TestnetSection from '../sections/developers/TestnetSection';
import ConnectSection from '../sections/developers/ConnectSection';
import BlogSection from '../sections/shared/BlogSection';

const DevelopersPage = (): JSX.Element => {
  return (
    <>
      <SEO title="For Developers" />
      <TopSection />
      <LedgerSection />
      <TestnetSection />
      <ConnectSection />
      <BlogSection />
    </>
  );
};

export default DevelopersPage;
