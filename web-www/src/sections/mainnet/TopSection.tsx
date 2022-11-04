import React from 'react';
import { Box } from '@mui/material';
import Countdown from '@regen-network/web-components/lib/components/countdown';
import { Title } from '@regen-network/web-components/lib/components/typography';
import { graphql, useStaticQuery } from 'gatsby';
import type { FluidObject } from 'gatsby-image';

import BackgroundSection from '../../components/BackgroundSection';
import type { MainnetTopSectionQuery } from '../../generated/graphql';

const query = graphql`
  query mainnetTopSection {
    desktop: file(relativePath: { eq: "mainnet-globe.png" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityMainnetPage {
      launchDate
      topSection {
        title
        body
      }
    }
  }
`;

const TopSection: React.FC = () => {
  const { desktop, sanityMainnetPage } =
    useStaticQuery<MainnetTopSectionQuery>(query);
  const data = sanityMainnetPage?.topSection;
  return (
    <BackgroundSection
      header={
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <div>{data?.title}</div>
          <div>
            <Title
              color="primary"
              sx={{
                px: 2,
                borderRadius: '5px',
                display: 'inline-flex',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <Countdown date={sanityMainnetPage?.launchDate} />
            </Title>
          </div>
        </Box>
      }
      linearGradient="linear-gradient(220.67deg, rgba(250, 235, 209, 0.6) 21.4%, rgba(125, 201, 191, 0.6) 46.63%, rgba(81, 93, 137, 0.6) 71.86%), linear-gradient(180deg, rgba(0, 0, 0, 0.684) 0%, rgba(0, 0, 0, 0) 97.78%)"
      body={<span>{data?.body}</span>}
      imageData={desktop?.childImageSharp?.fluid as FluidObject}
    />
  );
};

export default TopSection;
