import React from 'react';

import SEO from '../components/seo';
import TopSection from '../sections/developers/TopSection';
import InvolvedSection from '../sections/developers/InvolvedSection';
import ApproachSection from '../sections/developers/ApproachSection';
import LedgerSection from '../sections/developers/LedgerSection';
import OpenAgSection from '../sections/developers/OpenAgSection';
import ConnectSection from '../sections/developers/ConnectSection';

const DevelopersPage = (): JSX.Element => {
  return (
    <>
      <SEO title="For Developers" />
      <TopSection />
      <ApproachSection />
      <InvolvedSection />
      <LedgerSection />
      <OpenAgSection />
      <ConnectSection />
    </>
  );
};

export default DevelopersPage;
