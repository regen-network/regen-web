import React from 'react';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import ContainedButton from '@regen-network/web-components/lib/components/buttons/ContainedButton';
import Section from '@regen-network/web-components/lib/components/section';
import Tooltip from '@regen-network/web-components/lib/components/tooltip';
import {
  Body,
  Label,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import type { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import type { FluidObject } from 'gatsby-image';
import SanityImage from 'gatsby-plugin-sanity-image';

import type { HomeMarketPlaceSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    zIndex: 1,
    paddingTop: theme.spacing(25),
    paddingBottom: theme.spacing(25),
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(20),
      paddingBottom: theme.spacing(20),
    },
    height: 'min-content',
    color: theme.palette.primary.contrastText,
    'font-family': theme.typography.h1.fontFamily,
    'text-align': 'center',
    '& h2': {
      width: '100%',
      'font-family': 'Muli',
      margin: '0 auto',
      'line-height': '150%',
      'padding-bottom': theme.spacing(10),
      'margin-bottom': theme.spacing(2),
      'font-weight': 900,
    },
    '& .MuiGrid-item.MuiGrid-root': {
      padding: theme.spacing(1),
      'padding-left': theme.spacing(3),
      'padding-right': theme.spacing(3),
      '& p': {
        color: theme.palette.info.dark,
      },
    },
  },
  registry: {
    color: theme.palette.secondary.main,
  },
  bgdiv: {
    'margin-bottom': theme.spacing(4),
  },
  inner: {
    [theme.breakpoints.up('sm')]: {
      'max-width': '85%',
    },
    margin: '0 auto',
  },
  gridItem: {
    [theme.breakpoints.down('md')]: {
      'flex-basis': 'auto',
      'margin-bottom': theme.spacing(8),
    },
  },
  popover: {
    cursor: 'pointer',
    borderBottom: `3px dashed ${theme.palette.secondary.main}`,
  },
}));

const query = graphql`
  query homeMarketPlaceSection {
    bg: file(relativePath: { eq: "topo-bg-top.png" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityHomePageWeb {
      marketplaceSection {
        header
        tooltip
        body {
          green
          middle
          popover
          end
        }
        callToActions {
          ...callToActionFields
        }
      }
    }
  }
`;

const MarketplaceSection: React.FC = () => {
  const styles = useStyles({});
  const { sanityHomePageWeb, bg } =
    useStaticQuery<HomeMarketPlaceSectionQuery>(query);
  const data = sanityHomePageWeb?.marketplaceSection;

  return (
    <BackgroundImage
      fluid={bg?.childImageSharp?.fluid as FluidObject}
      style={{ zIndex: 2 }}
    >
      <Section className={styles.root}>
        <div className={styles.inner}>
          <Label size="lg" sx={{ color: 'info.main', mb: 5 }}>
            {data?.header}
          </Label>
          <Title variant="h2" align="center">
            <Box component="span" sx={{ color: 'secondary.main' }}>
              {data?.body?.green}{' '}
            </Box>
            {data?.body?.middle}{' '}
            <Tooltip arrow placement="top" title={data?.tooltip || ''}>
              <span className={styles.popover}>{data?.body?.popover}</span>
            </Tooltip>{' '}
            {data?.body?.end}
          </Title>
          <Grid container spacing={3}>
            {data?.callToActions?.map((cta, i) => {
              return !cta ? null : (
                <Grid key={cta.header || i} className={styles.gridItem} item xs>
                  <SanityImage
                    {...(cta.image as any)}
                    alt={cta.caption}
                    width={159}
                    style={{ width: '159px' }}
                  />
                  <Label size="md" sx={{ pt: 4 }}>
                    {cta.caption}
                  </Label>
                  <Title
                    variant="h3"
                    mobileVariant="h5"
                    sx={{ textAlign: 'center', my: 3 }}
                  >
                    {cta.header}
                  </Title>
                  <Body size="xl" mobileSize="md">
                    {cta.description}
                  </Body>
                  <ContainedButton
                    size="large"
                    href={cta.linkUrl || ''}
                    sx={{ mt: [4, 7] }}
                  >
                    {cta.linkText}
                  </ContainedButton>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </Section>
    </BackgroundImage>
  );
};

export default MarketplaceSection;
