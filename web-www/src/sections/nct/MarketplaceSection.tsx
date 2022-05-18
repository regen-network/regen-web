import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import SanityImage from 'gatsby-plugin-sanity-image';
import { Box } from '@mui/material';

import Section from 'web-components/lib/components/section';

import { Body, Title } from 'web-components/lib/components/typography';
import { BlockContent } from 'web-components/src/components/block-content';

import type { NctMarketplaceSectionQuery } from '../../generated/graphql';

const query = graphql`
  query nctMarketplaceSection {
    sanityNctPage {
      marketplaceSection {
        title
        _rawBody
        image {
          ...customImageFields
        }
      }
    }
  }
`;

export const MarketplaceSection = (): JSX.Element => {
  const { sanityNctPage } = useStaticQuery<NctMarketplaceSectionQuery>(query);
  const data = sanityNctPage?.marketplaceSection;

  return (
    <Section
      sx={{
        root: {
          py: [20, 30],
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
      }}
    >
      <SanityImage
        {...(data?.image?.image as any)}
        alt={data?.image?.imageAlt || ''}
        width={691}
        style={{
          maxWidth: '691px',
          maxHeight: '892px',
          objectFit: 'cover',
        }}
      />
      <Box sx={{ maxWidth: 700 }}>
        <Title variant="h2" sx={{ textAlign: 'center', my: [4, 8] }}>
          {data?.title}
        </Title>
        <Body as="div" size="xl" align="center">
          <BlockContent content={data?._rawBody} />
        </Body>
      </Box>
    </Section>
  );
};
