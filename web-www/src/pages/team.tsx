import React from 'react';

import TopSection from '../sections/team/TopSection';
import CoreTeam from '../sections/team/CoreTeamSection';
import ContributorSection from '../sections/team/ContributorSection';
import AdvisorSection from '../sections/team/AdvisorSection';
import SEO from '../components/seo';

const ResourcesPage = (): JSX.Element => {
  return (
    <>
      <SEO title="Team" />
      <TopSection />
      <CoreTeam />
      <ContributorSection />
      <AdvisorSection />
    </>
  );
};

export default ResourcesPage;
