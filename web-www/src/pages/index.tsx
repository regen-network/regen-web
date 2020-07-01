import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import BackgroundImage from 'gatsby-background-image';

import SEO from '../components/seo';
import HomeFoldSection from '../sections/home/FoldSection';
import MarketplaceSection from '../sections/home/MarketplaceSection';
import HomeLedger from '../sections/home/LedgerSection';
import HomeValuesSection from '../sections/home/ValuesSection';
import ClimateSection from '../sections/home/ClimateSection';
import CarbonPlusSection from '../sections/home/CarbonPlusSection';
import EmailSubmitSection from '../sections/shared/EmailSubmitSection';

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    backgroundSize: 'cover',
    [theme.breakpoints.down('xs')]: {
      backgroundPositionX: '-700px',
    },
  },
}));

const IndexPage = (): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();
  const data = useStaticQuery(graphql`
    query {
      background: file(relativePath: { eq: "home-climate-bg.jpg" }) {
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
      <SEO title="Home" mailerlite />
      <HomeFoldSection />
      <MarketplaceSection />
      <EmailSubmitSection />
      <BackgroundImage
        Tag="section"
        className={classes.image}
        fluid={data.background.childImageSharp.fluid}
        backgroundColor={theme.palette.grey['50']}
      >
        <ClimateSection />
        <CarbonPlusSection />
      </BackgroundImage>
      <HomeLedger />
      <HomeValuesSection />
    </>
  );
};

export default IndexPage;
