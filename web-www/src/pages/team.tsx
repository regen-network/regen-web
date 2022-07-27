import React from 'react';
import { graphql, PageProps, useStaticQuery } from 'gatsby';

import SEO from '../components/seo';
import AdvisorSection from '../sections/team/AdvisorSection';
import CoreTeam from '../sections/team/CoreTeamSection';
import TopSection from '../sections/team/TopSection';

const ResourcesPage: React.FC<PageProps> = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      seoImage: file(relativePath: { eq: "team-seo.jpeg" }) {
        publicURL
      }
    }
  `);
  return (
    <>
      <SEO
        description="We are developers, ecologists, scientists, and designers from all over the world, bound by our common purpose of planetary regeneration. Feel free to connect with us."
        title="Team"
        location={location}
        imageUrl={data.seoImage.publicURL}
      />
      <TopSection />
      <CoreTeam />
      <AdvisorSection />
    </>
  );
};

export default ResourcesPage;
