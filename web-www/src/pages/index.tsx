import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useTheme } from '@material-ui/core';
import BackgroundImage from 'gatsby-background-image';
import Box from '@material-ui/core/Box';

import SEO from '../components/seo';
import HomeFoldSection from '../sections/home/FoldSection';
import MarketplaceSection from '../sections/home/MarketplaceSection';
import HomeLedger from '../sections/home/LedgerSection';
import HomeValuesSection from '../sections/home/ValuesSection';
import ClimateSection from '../sections/home/ClimateSection';
import CarbonPlusSection from '../sections/home/CarbonPlusSection';
import EmailSubmitSection from '../sections/shared/EmailSubmitSection';
import BlogSection from '../sections/shared/BlogSection';
import { useAllHomePageWebQuery } from '../generated/sanity-graphql';
import { client } from '../../sanity';

const IndexPage: React.FC<{ location: Location }> = ({ location }) => {
  const theme = useTheme();
  const imgData = useStaticQuery(graphql`
    query {
      seoImage: file(relativePath: { eq: "science.png" }) {
        publicURL
      }
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

  const { data } = useAllHomePageWebQuery({ client });
  const content = data?.allHomePageWeb?.[0];

  return (
    <>
      <SEO location={location} title="Regen Network" imageUrl={imgData.seoImage.publicURL} />
      <HomeFoldSection content={content?.homeFoldSection} />
      <MarketplaceSection content={content?.marketplaceSection} />
      <EmailSubmitSection />
      <Box display={{ xs: 'block', sm: 'none' }}>
        <BackgroundImage
          Tag="div"
          fluid={imgData.backgroundMobile.childImageSharp.fluid}
          backgroundColor={theme.palette.grey['50']}
          style={{
            backgroundPosition: 'left 70%',
          }}
        >
          <ClimateSection content={content?.climateSection} />
        </BackgroundImage>
        <CarbonPlusSection content={content?.carbonPlusSection} />
      </Box>
      <Box display={{ xs: 'none', sm: 'block' }}>
        <BackgroundImage
          Tag="div"
          fluid={imgData.background.childImageSharp.fluid}
          backgroundColor={theme.palette.grey['50']}
        >
          <ClimateSection content={content?.climateSection} />
          <CarbonPlusSection content={content?.carbonPlusSection} />
        </BackgroundImage>
      </Box>
      <HomeLedger description={content?.ledgerDescription || ''} />
      <HomeValuesSection content={content?.valuesSection} />
      <BlogSection />
    </>
  );
};

export default IndexPage;
