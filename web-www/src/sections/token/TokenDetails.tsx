import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import { FluidObject } from 'gatsby-image';

import TokenPool from './TokenPool';
import UnlockSchedule from './UnlockSchedule';

type QueryData = {
  bg: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
};

const TokenEconomics = (): JSX.Element => {
  const data = useStaticQuery<QueryData>(graphql`
    query {
      bg: file(relativePath: { eq: "topo-bg-portrait.jpg" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);
  const topo = data?.bg?.childImageSharp?.fluid;

  return (
    <BackgroundImage fluid={topo}>
      <TokenPool />
      <UnlockSchedule />
    </BackgroundImage>
  );
};
export default TokenEconomics;
