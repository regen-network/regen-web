import React from 'react';
import { Box, Link } from '@mui/material';
import ContainedButton from '@regen-network/web-components/lib/components/buttons/ContainedButton';
import SmallArrowIcon from '@regen-network/web-components/lib/components/icons/SmallArrowIcon';
import Section from '@regen-network/web-components/lib/components/section';
import {
  Body,
  Label,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import { BlockContent } from '@regen-network/web-components/lib/components/block-content';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import type { FluidObject } from 'gatsby-image';
import SanityImage from 'gatsby-plugin-sanity-image';

import type { NctOverviewSectionQuery } from '../../generated/graphql';

const query = graphql`
  query nctOverviewSection {
    sanityNctPage {
      overviewSection {
        title
        background {
          ...fluidSanityImageFields
        }
        titleIcon {
          ...ImageWithPreview
        }
        button {
          ...buttonFields
        }
        _rawBody
        items {
          label
          text
          link {
            ...linkFields
          }
        }
      }
    }
  }
`;

/** return a link with arrow icon if passed a link, otherwise display text */
const OptionalLink: React.FC<{ link?: string | null }> = ({
  link,
  children,
}) => {
  if (link) {
    return (
      <Link
        href={link}
        sx={{ display: 'flex', alignItems: 'baseline', color: 'unset' }}
      >
        {children} <SmallArrowIcon sx={{ ml: 2 }} />
      </Link>
    );
  }
  return <>{children}</>;
};

export const OverviewSection = (): JSX.Element => {
  const { sanityNctPage } = useStaticQuery<NctOverviewSectionQuery>(query);
  const data = sanityNctPage?.overviewSection;

  return (
    <BackgroundImage
      Tag="section"
      fluid={data?.background?.asset?.fluid as FluidObject}
    >
      <Section sx={{ root: { pb: [22.25, 40] } }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ maxWidth: 600 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Title variant="h1">{data?.title}</Title>
              <SanityImage {...(data?.titleIcon as any)} alt="NCT icon" />
            </Box>
            <Body as="div" size="xl">
              <BlockContent content={data?._rawBody} />
            </Body>
          </Box>
          {/* TODO: this conditional check is temporary until the basket pages are live */}
          {data?.button?.buttonLink?.buttonHref && (
            <ContainedButton
              size="large"
              href={data?.button?.buttonLink?.buttonHref || ''}
              sx={{ alignSelf: 'start', mt: [5, 7, 5] }}
            >
              {data?.button?.buttonText}
            </ContainedButton>
          )}
        </Box>
        <Box
          sx={{
            mt: [10, 14],
            display: 'flex',
            gap: { xs: 10, md: 20 },
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          {data?.items?.map((item, i) => (
            <div key={i}>
              <Label>{item?.label || ''}</Label>
              <OptionalLink link={item?.link?.buttonHref}>
                <Body size="lg" pt={2}>
                  {item?.text}
                </Body>
              </OptionalLink>
            </div>
          ))}
        </Box>
      </Section>
    </BackgroundImage>
  );
};
