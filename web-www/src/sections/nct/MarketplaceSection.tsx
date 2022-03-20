import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import SanityImage from 'gatsby-plugin-sanity-image';
import { Box } from '@mui/material';

import Section from 'web-components/lib/components/section';

import Title from 'web-components/lib/components/title';
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
    <Section sx={{ py: [20, 30] }}>
      <SanityImage
        {...(data?.image?.image as any)}
        alt={data?.image?.imageAlt || ''}
        width={691}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'cover',
        }}
      />
      <Box sx={{ maxWidth: 700, m: '0 auto' }}>
        <Title variant="h2" sx={{ textAlign: 'center', my: [4, 8] }}>
          {data?.title}
        </Title>
        <BlockContent
          content={data?._rawBody}
          sxWrap={{ '& p': { fontSize: [18, 22], textAlign: 'center' } }}
        />
      </Box>
    </Section>
  );
};
