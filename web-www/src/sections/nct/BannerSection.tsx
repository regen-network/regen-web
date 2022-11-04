import React from 'react';
import { Box } from '@mui/material';
import Section from '@regen-network/web-components/lib/components/section';
import {
  Body,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import { BlockContent } from '@regen-network/web-components/lib/components/block-content';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import { FluidObject } from 'gatsby-image';

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
      <Section sx={{ root: { pb: [20, 30] } }}>
        <Box sx={{ maxWidth: 700, m: '0 auto' }}>
          <Title
            variant="h3"
            sx={{ color: 'primary.main', textAlign: 'center' }}
          >
            {data?.title}
          </Title>
          <Body
            as="div"
            size="xl"
            sx={{ color: 'primary.main', textAlign: 'center', pt: 4 }}
          >
            <BlockContent content={data?._rawBody} />
          </Body>
        </Box>
      </Section>
    </BackgroundImage>
  );
};
