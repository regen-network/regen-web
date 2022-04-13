import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import { FluidObject } from 'gatsby-image';
import { Box } from '@mui/material';

import Section from 'web-components/lib/components/section';

import { Title } from 'web-components/lib/components/typography';
import { BlockContent } from 'web-components/src/components/block-content';

import type { NctBannerSectionQuery } from '../../generated/graphql';

const query = graphql`
  query nctBannerSection {
    sanityNctPage {
      banner {
        title
        _rawBody
        image {
          ...fluidCustomImageFields
        }
      }
    }
  }
`;

export const BannerSection = (): JSX.Element => {
  const { sanityNctPage } = useStaticQuery<NctBannerSectionQuery>(query);
  const data = sanityNctPage?.banner;

  return (
    <BackgroundImage fluid={data?.image?.image?.asset?.fluid as FluidObject}>
      <Section sx={{ py: [20, 30] }}>
        <Box sx={{ maxWidth: 700, m: '0 auto' }}>
          <Title
            variant="h3"
            sx={{ color: 'primary.main', textAlign: 'center' }}
          >
            {data?.title}
          </Title>
          <BlockContent
            content={data?._rawBody}
            sxWrap={{
              maxWidth: 650,
              '& p': {
                color: 'primary.main',
                fontSize: { xs: 18, sm: 22 },
                textAlign: 'center',
              },
            }}
          />
        </Box>
      </Section>
    </BackgroundImage>
  );
};
