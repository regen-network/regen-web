import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import { FluidObject } from 'gatsby-image';
import { Theme, makeStyles } from '@material-ui/core';

import TokenPool from './TokenPool';
import UnlockSchedule from './UnlockSchedule';

type QueryData = {
  bg: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
};

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(24),
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(20),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(12),
    },
  },
}));

const TokenEconomics = (): JSX.Element => {
  const styles = useStyles();
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
    <BackgroundImage fluid={topo} className={styles.root}>
      <TokenPool />
      {/* <UnlockSchedule /> */}
    </BackgroundImage>
  );
};
export default TokenEconomics;
