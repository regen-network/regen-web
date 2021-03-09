import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql, PageProps } from 'gatsby';
import { navigate } from 'gatsby';

import SEO from '../components/seo';
import TopSection from '../sections/mainnet/TopSection';

interface Props extends PageProps {}

const Mainnet = ({ location }: Props): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      background: file(relativePath: { eq: "mainnet-globe.png" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  return (
    <>
      <SEO
        location={location}
        description="With the help of our fantastic community and extraordinary team, mainnet is on the horizon!"
        title="For Buyers"
        imageUrl={data.background.publicURL}
      />
      <TopSection />
    </>
  );
};

export default Mainnet;
