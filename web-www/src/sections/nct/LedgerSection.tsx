import React from 'react';
import { Box } from '@mui/material';
import OutlinedButton from '@regen-network/web-components/lib/components/buttons/OutlinedButton';
import Section from '@regen-network/web-components/lib/components/section';
import {
  Body,
  Label,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import { BlockContent } from '@regen-network/web-components/lib/components/block-content';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import { FluidObject } from 'gatsby-image';
import SanityImage from 'gatsby-plugin-sanity-image';

import type { NctLedgerSectionQuery } from '../../generated/graphql';

const query = graphql`
  query nctLedgerSection {
    bg: file(relativePath: { eq: "topo-bg-top.png" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityNctPage {
      ledgerSection {
        icon {
          ...ImageWithPreview
        }
        title
        subtitle
        _rawBody
        button {
          ...buttonFields
        }
      }
    }
  }
`;

export const LedgerSection = (): JSX.Element => {
  const { bg, sanityNctPage } = useStaticQuery<NctLedgerSectionQuery>(query);
  const data = sanityNctPage?.ledgerSection;

  return (
    <Box
      sx={{
        borderTop: 1,
        borderBottom: 1,
        borderColor: 'grey.100',
      }}
    >
      <BackgroundImage fluid={bg?.childImageSharp?.fluid as FluidObject}>
        <Section sx={{ root: { py: [20, 30] } }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              gap: 5,
              maxWidth: 760,
              m: '0 auto',
            }}
          >
            <SanityImage {...(data?.icon as any)} alt="Regen icon" />
            <Title variant="h2" sx={{ mt: [4, 8], textAlign: 'center' }}>
              {data?.title}
            </Title>
            <Label color="info.main" align="center" mt={[4, 8]}>
              {data?.subtitle}
            </Label>
            <Body as="div" size="xl" align="center">
              <BlockContent content={data?._rawBody} />
            </Body>
            <OutlinedButton
              sx={{ px: [8, 12], mt: [4, 8] }}
              href={data?.button?.buttonLink?.buttonHref || ''}
              target={data?.button?.buttonBlankTarget ? '_blank' : '_self'}
            >
              {data?.button?.buttonText}
            </OutlinedButton>
          </Box>
        </Section>
      </BackgroundImage>
    </Box>
  );
};
