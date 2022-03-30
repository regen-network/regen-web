import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Box, Typography } from '@mui/material';
import SanityImage from 'gatsby-plugin-sanity-image';

import Title from 'web-components/lib/components/title';
import {
  BlockContent,
  SanityBlockContent,
} from 'web-components/src/components/block-content';
import Section from 'web-components/lib/components/section';
import { formatDate } from 'web-components/lib/utils/format';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import { Label } from 'web-components/lib/components/label';
import Countdown from 'web-components/lib/components/countdown';

import type { NctTokenSectionQuery } from '../../generated/graphql';

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

  const btnPad = { px: { xs: 8, sm: 12 } } as const;

  const Card = (): JSX.Element => (
    <Box
      sx={{
        border: 1,
        borderColor: 'grey.100',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: { xs: 'column', tablet: 'row' },
      }}
    >
      <Box
        sx={{
          px: { xs: 4, sm: 8 },
          py: { xs: 8, sm: 10 },
          minWidth: {
            xs: '100%',
            sm: '40%',
          },
          background:
            'radial-gradient(88.07% 99.33% at 17.75% 108.83%, rgba(238, 250, 242, 0.5) 5.89%, rgba(255, 255, 255, 0.5) 100%)',
        }}
      >
        <SanityImage
          {...(data?.cardImage?.image as any)}
          alt={data?.cardImage?.imageAlt}
          style={{
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            maxHeight: '600px',
            objectFit: 'contain',
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
        {/* TODO remove manual line height. See: https://github.com/regen-network/regen-registry/issues/866 */}
        <Title variant="h3" sx={{ lineHeight: { xs: '34.8px', sm: '44.8px' } }}>
          {data?.cardTitle}
          {/* TODO uncomment if we want to display countdown */}
          {/* <Box
            component="span"
            sx={{
              px: 2,
              backgroundColor: 'info.light',
              borderRadius: '5px',
            }}
          >
            <Countdown date={launchDate} />
          </Box> */}
        </Title>
        <Typography
          sx={{ fontSize: [16, 18], fontWeight: 700, color: 'info.main' }}
        >
          {/* TODO uncomment if we want to formatted date based on CMS launch date */}
          {data?.cardSubtitle} {/* {formatDate(launchDate)} */}
        </Typography>
        <BodyContent content={data?._rawCardBody} />
        <ContainedButton
          sx={{
            alignSelf: 'start',
            mb: [8, 'inherit'],
            mt: [4, 8],
            ...btnPad,
          }}
          href={data?.cardButton?.buttonLink?.buttonHref || ''}
          target={data?.cardButton?.buttonBlankTarget ? '_blank' : '_self'}
        >
          {data?.cardButton?.buttonText}
        </ContainedButton>
      </Box>
    </Box>
  );

  const Detail = (): JSX.Element => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column-reverse', tablet: 'row' },
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          maxWidth: 656,
        }}
      >
        <Title variant="h2">{data?.detailTitle}</Title>
        <Label sx={{ fontSize: { xs: 14, sm: 18 }, color: 'info.main' }}>
          {data?.detailSubtitle} {/* {formatDate(launchDate)} */}
        </Label>
        <BodyContent content={data?._rawDetailBody} />
        <Box sx={{ display: 'flex', gap: 3, mt: [4, 8] }}>
          <OutlinedButton
            sx={btnPad}
            href={data?.detailButton1?.buttonLink?.buttonHref || ''}
            target={data?.detailButton1?.buttonBlankTarget ? '_blank' : '_self'}
          >
            {data?.detailButton1?.buttonText}
          </OutlinedButton>
          <ContainedButton
            sx={btnPad}
            href={data?.detailButton2?.buttonLink?.buttonHref || ''}
            target={data?.detailButton2?.buttonBlankTarget ? '_blank' : '_self'}
          >
            {data?.detailButton2?.buttonText}
          </ContainedButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: { xs: '100%', tablet: '33%' },
        }}
      >
        <SanityImage
          {...(data?.detailImage?.image as any)}
          alt={data?.detailImage?.imageAlt}
          style={{
            alignSelf: 'center',
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
    </Box>
  );

  return (
    <Section sx={{ pb: [22.25, 40] }}>
      <Box sx={{ pt: [10, 12] }}>
        <Card />
      </Box>
      <Box sx={{ pt: [10, 30] }}>
        <Detail />
      </Box>
    </Section>
  );
};
