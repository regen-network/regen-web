import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import { GatsbyImageData } from 'gatsby-plugin-image';
import { Theme, makeStyles } from '@mui/material';

import TokenPool from './TokenPool';

type QueryData = {
  bg: {
    childImageSharp: {
      gatsbyImageData: GatsbyImageData;
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
  const data = useStaticQuery<QueryData>(graphql`{
  bg: file(relativePath: {eq: "topo-bg-portrait.jpg"}) {
    childImageSharp {
      gatsbyImageData(quality: 90, layout: FULL_WIDTH)
    }
  }
}
`);
  const topo = data?.bg?.childImageSharp?.gatsbyImageData;

  return (
    <BackgroundImage fluid={topo} className={styles.root}>
      <TokenPool />
    </BackgroundImage>
  );
};
export default TokenEconomics;
