import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import SanityImage from 'gatsby-plugin-sanity-image';
import BackgroundImage from 'gatsby-background-image';
import { FluidObject } from 'gatsby-image';
import { Box } from '@mui/material';

import Section from 'web-components/lib/components/section';
import { BodyText, Title } from 'web-components/lib/components/typography';
import { BlockContent } from 'web-components/src/components/block-content';
import { Label } from 'web-components/lib/components/typography';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';

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
            <Label
              sx={{
                color: 'info.main',
                fontSize: [14, 18],
                textAlign: 'center',
              }}
            >
              {data?.subtitle}
            </Label>
            <BodyText size="xl" align="center">
              <BlockContent content={data?._rawBody} />
            </BodyText>
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
