import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import { Box, Link, Typography } from '@mui/material';
import SanityImage from 'gatsby-plugin-sanity-image';

import { Title } from 'web-components/lib/components/typography';

import { BlockContent } from 'web-components/src/components/block-content';
import Section from 'web-components/lib/components/section';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import SmallArrowIcon from 'web-components/lib/components/icons/SmallArrowIcon';
import { Label } from 'web-components/lib/components/typography';

import type { NctOverviewSectionQuery } from '../../generated/graphql';
import type { FluidObject } from 'gatsby-image';

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
      <Section sx={{ pb: [22.25, 40] }}>
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
            <BlockContent
              noYMargin
              content={data?._rawBody}
              sxWrap={{ '& p': { fontSize: [18, 22] } }}
            />
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
              <Label sx={{ fontSize: [14, 18] }}>{item?.label || ''}</Label>
              <OptionalLink link={item?.link?.buttonHref}>
                <Typography sx={{ fontSize: [16, 18], pt: 2 }}>
                  {item?.text}
                </Typography>
              </OptionalLink>
            </div>
          ))}
        </Box>
      </Section>
    </BackgroundImage>
  );
};
