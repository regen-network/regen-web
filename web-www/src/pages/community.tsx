import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core';

import TopSection from '../sections/community/TopSection';
import SEO from '../components/seo';

interface props {
  location: object;
}

const useStyles = makeStyles((theme: Theme) => ({
  tooltip: {},
}));

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
        title="For Developers"
        location={location}
        imageUrl={data.seoImage.publicURL}
      />
      <TopSection />
    </>
  );
};

export default CommunityPage;
