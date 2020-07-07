import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import BackgroundImage from 'gatsby-background-image';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
    '&:before, :after': {
      [theme.breakpoints.down('xs')]: {
        top: '-33% !important',
      },
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
      backgroundMobile: file(relativePath: { eq: "home-climate-bg-mobile.jpg" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  const mobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      <SEO title="Home" mailerlite />
      <HomeFoldSection />
      <MarketplaceSection />
      <EmailSubmitSection />
      <BackgroundImage
        Tag="div"
        fluid={
          mobile ? data.backgroundMobile.childImageSharp.fluid : data.background.childImageSharp.fluid
        }
        backgroundColor={theme.palette.grey['50']}
        className={classes.image}
        style={{
          backgroundPosition: mobile ? 'left center' : 'center',
        }}
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
