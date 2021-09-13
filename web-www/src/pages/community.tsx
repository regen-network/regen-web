import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import TopSection from '../sections/community/TopSection';
import CollaborateSection from '../sections/community/CollaborateSection';
import ConnectSection from '../sections/community/ConnectSection';
import CollectiveSection from '../sections/community/CollectiveSection';
import GoToSection from '../sections/community/GoToSection';
import SEO from '../components/seo';

interface props {
  location: Location;
}

const CommunityPage = ({ location }: props): JSX.Element => {
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
