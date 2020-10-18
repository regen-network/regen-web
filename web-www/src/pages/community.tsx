import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import TopSection from '../sections/community/TopSection';
import CommunitySection from '../sections/community/CollaborateSection';
import SEO from '../components/seo';

interface props {
  location: object;
}

const CommunityPage = ({ location }: props): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      seoImage: file(relativePath: { eq: "developers-top-image.jpg" }) {
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
        imageUrl={data.seoImage.publicURL}
      />
      <TopSection location={location} />
      <CommunitySection />
    </>
  );
};

export default CommunityPage;
