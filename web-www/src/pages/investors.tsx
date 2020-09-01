import React from 'react';

import TopSection from '../sections/investors/TopSection';
import CoreTeam from '../sections/team/CoreTeamSection';
import ContributorSection from '../sections/team/ContributorSection';
import AdvisorSection from '../sections/team/AdvisorSection';
import SEO from '../components/seo';

const InvestorsPage = (): JSX.Element => {
  return (
    <>
      <SEO title="Team" />
      <TopSection />
    </>
  );
};

export default InvestorsPage;
