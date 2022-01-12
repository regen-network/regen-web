import React from 'react';
import { useStaticQuery, graphql, PageProps } from 'gatsby';
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
import { HomePageWebQuery } from '../generated/graphql';

const query = graphql`
  query homePageWeb {
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
`;

const IndexPage: React.FC<PageProps> = ({ location }) => {
  const theme = useTheme();
  const data = useStaticQuery<HomePageWebQuery>(query);

  return (
    <>
      <SEO location={location} title="Regen Network" imageUrl={`${data?.seoImage?.publicURL}`} />
      <HomeFoldSection />
      <MarketplaceSection />
      <EmailSubmitSection />
      <Box display={{ xs: 'block', sm: 'none' }}>
        <BackgroundImage
          Tag="div"
          fluid={data?.backgroundMobile?.childImageSharp?.fluid as any}
          backgroundColor={theme.palette.grey['50']}
          style={{
            backgroundPosition: 'left 70%',
          }}
        >
          <ClimateSection />
        </BackgroundImage>
        <CarbonPlusSection />
      </Box>
      <Box display={{ xs: 'none', sm: 'block' }}>
        <BackgroundImage
          Tag="div"
          fluid={data?.background?.childImageSharp?.fluid as any}
          backgroundColor={theme.palette.grey['50']}
        >
          <ClimateSection />
          <CarbonPlusSection />
        </BackgroundImage>
      </Box>
      <HomeLedger />
      <HomeValuesSection />
      <BlogSection />
    </>
  );
};

export default IndexPage;
