import React from 'react';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { graphql, PageProps, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

import SEO from '../components/seo';
import { HomePageWebQuery } from '../generated/graphql';
import CarbonPlusSection from '../sections/home/CarbonPlusSection';
import ClimateSection from '../sections/home/ClimateSection';
import HomeFoldSection from '../sections/home/FoldSection';
import HomeLedger from '../sections/home/LedgerSection';
import MarketplaceSection from '../sections/home/MarketplaceSection';
import HomeValuesSection from '../sections/home/ValuesSection';
import BlogSection from '../sections/shared/BlogSection';

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
      <SEO
        location={location}
        title="Regen Network"
        imageUrl={`${data?.seoImage?.publicURL}`}
      />
      <HomeFoldSection />
      <Box display={{ xs: 'block', sm: 'none' }}>
        <CarbonPlusSection />
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
      </Box>
      <Box display={{ xs: 'none', sm: 'block' }} sx={{ mb: 10 }}>
        <CarbonPlusSection />
        <BackgroundImage
          Tag="div"
          fluid={data?.background?.childImageSharp?.fluid as any}
          backgroundColor={theme.palette.grey['50']}
        >
          <ClimateSection />
        </BackgroundImage>
      </Box>
      <HomeValuesSection />
      <MarketplaceSection />
      <HomeLedger />
      <BlogSection />
    </>
  );
};

export default IndexPage;
