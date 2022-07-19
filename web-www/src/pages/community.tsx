import React from 'react';
import { graphql, PageProps, useStaticQuery } from 'gatsby';

import SEO from '../components/seo';
import CollaborateSection from '../sections/community/CollaborateSection';
import CollectiveSection from '../sections/community/CollectiveSection';
import ConnectSection from '../sections/community/ConnectSection';
import GoToSection from '../sections/community/GoToSection';
import TopSection from '../sections/community/TopSection';

const CommunityPage: React.FC<PageProps> = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      seoImage: file(relativePath: { eq: "community-header.png" }) {
        publicURL
      }
    }
  `);
  return (
    <>
      <SEO
        description="The Regen Ledger blockchain enables our community to develop a suite of platforms and applications in service of regenerating human relationships with land - join us."
        title="Community"
        location={location}
        imageUrl={data?.seoImage?.publicURL}
      />
      <TopSection />
      <GoToSection />
      <ConnectSection />
      <CollectiveSection />
      <CollaborateSection />
    </>
  );
};

export default CommunityPage;
