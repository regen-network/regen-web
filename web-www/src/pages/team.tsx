import React from 'react';

import TopSection from '../sections/team/TopSection';
import CoreTeam from '../sections/team/CoreTeamSection';
import ContributorSection from '../sections/team/ContributorSection';
import AdvisorSection from '../sections/team/AdvisorSection';
import SEO from '../components/seo';

interface props {
  location: object;
}

const ResourcesPage = ({ location }: props): JSX.Element => {
  return (
    <>
      <SEO
        description="We are developers, ecologists, scientists, and designers from all over the world, bound by our common purpose of planetary regeneration. Feel free to connect with us."
        title="Team"
        location={location}
      />
      <TopSection />
      <CoreTeam />
      <ContributorSection />
      <AdvisorSection />
    </>
  );
};

export default ResourcesPage;
