import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import {
  Box,
  Link,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SanityImage from 'gatsby-plugin-sanity-image';

import Title from 'web-components/lib/components/title';

import {
  BlockContent,
  SanityBlockContent,
} from 'web-components/src/components/block-content';
import Section from 'web-components/lib/components/section';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import SmallArrowIcon from 'web-components/lib/components/icons/SmallArrowIcon';
import { Label } from 'web-components/lib/components/label';

import type { NctTokenSectionQuery } from '../../generated/graphql';
import { formatDate } from 'web-components/lib/utils/format';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';

const BodyContent: React.FC<{ content: SanityBlockContent }> = ({
  content,
}) => (
  <BlockContent
    noYMargin
    content={content}
    sxWrap={{ '& p': { fontSize: [18, 22] } }}
  />
);

export const TokenSection = (): JSX.Element => {
  const { sanityNctPage } = useStaticQuery<NctTokenSectionQuery>(query);
  const data = sanityNctPage?.tokenSection;
  const launchDate = sanityNctPage?.launchDate;

  const Card = (): JSX.Element => (
    <Box
      sx={{
        border: 1,
        borderColor: 'grey.100',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
      }}
    >
      <Box sx={{ minWidth: { xs: '100%', sm: '50%', md: '40%' } }}>
        <SanityImage
          {...(data?.cardImage?.image as any)}
          alt={data?.cardImage?.imageAlt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderLeft: 1,
          borderColor: 'info.light',
          gap: 3,
          py: [7, 14],
          px: [4, 12],
        }}
      >
        <Title variant="h3">{data?.cardTitle}</Title>
        <Typography
          sx={{ fontSize: [16, 18], fontWeight: 700, color: 'info.main' }}
        >
          {data?.cardSubtitle} {formatDate(launchDate)}
        </Typography>
        <BodyContent content={data?._rawCardBody} />
        <ContainedButton
          sx={{ alignSelf: 'start', mb: [8, 'inherit'], mt: [4, 8] }}
          href={data?.cardButton?.buttonLink?.buttonHref || ''}
        >
          {data?.cardButton?.buttonText}
        </ContainedButton>
      </Box>
    </Box>
  );

  return (
    <Section sx={{ pb: [22.25, 40] }}>
      {/* Card */}
      <Card />

      {/* Detail */}
      <Box sx={{ pt: [10, 20] }}>
        <Box>
          <Title variant="h3">{data?.detailTitle}</Title>
          <Title
            sx={{
              fontSize: { xs: 14, sm: 18 },
              color: 'info.main',
              fontWeight: 800,
              textTransform: 'uppercase',
            }}
          >
            {data?.detailSubtitle}
          </Title>
          <BodyContent content={data?._rawDetailBody} />
          <div>
            <OutlinedButton
              size="small"
              href={data?.detailButton1?.buttonLink?.buttonHref || ''}
            >
              {data?.detailButton1?.buttonText}
            </OutlinedButton>
            <ContainedButton
              size="small"
              href={data?.detailButton2?.buttonLink?.buttonHref || ''}
            >
              {data?.detailButton2?.buttonText}
            </ContainedButton>
          </div>
          <Box sx={{ my: 2 }} />
          <div>
            <OutlinedButton
              size="medium"
              href={data?.detailButton1?.buttonLink?.buttonHref || ''}
            >
              {data?.detailButton1?.buttonText}
            </OutlinedButton>
            <ContainedButton
              size="medium"
              href={data?.detailButton2?.buttonLink?.buttonHref || ''}
            >
              {data?.detailButton2?.buttonText}
            </ContainedButton>
          </div>
          <Box sx={{ my: 2 }} />
          <div>
            <OutlinedButton
              size="large"
              href={data?.detailButton1?.buttonLink?.buttonHref || ''}
            >
              {data?.detailButton1?.buttonText}
            </OutlinedButton>
            <ContainedButton
              size="large"
              href={data?.detailButton2?.buttonLink?.buttonHref || ''}
            >
              {data?.detailButton2?.buttonText}
            </ContainedButton>
          </div>
        </Box>
      </Box>
    </Section>
  );
};

const query = graphql`
  query nctTokenSection {
    sanityNctPage {
      launchDate
      tokenSection {
        cardImage {
          ...customImageFields
        }
        cardTitle
        cardSubtitle
        _rawCardBody
        cardButton {
          ...buttonFields
        }
        detailImage {
          ...customImageFields
        }
        detailTitle
        detailSubtitle
        _rawDetailBody
        detailButton1 {
          ...buttonFields
        }
        detailButton2 {
          ...buttonFields
        }
      }
    }
  }
`;
