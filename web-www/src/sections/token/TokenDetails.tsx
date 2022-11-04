import React from 'react';
import { makeStyles } from '@mui/styles';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import { FluidObject } from 'gatsby-image';

import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';

import TokenPool from './TokenPool';

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
  },
}));

const TokenEconomics = (): JSX.Element => {
  const styles = useStyles();
  const data = useStaticQuery<QueryData>(graphql`
    {
      bg: file(relativePath: { eq: "topo-bg-portrait.jpg" }) {
        childImageSharp {
          fluid(quality: 90) {
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
    </BackgroundImage>
  );
};
export default TokenEconomics;
