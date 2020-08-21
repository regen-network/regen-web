import React from 'react';

import TopSection from '../sections/team/TopSection';
import CoreTeam from '../sections/team/CoreTeam';
import SEO from '../components/seo';

const ResourcesPage = (): JSX.Element => {
  return (
    <>
      <SEO title="Team" />
      <TopSection />
      <CoreTeam />
    </>
  );
};

export default ResourcesPage;
