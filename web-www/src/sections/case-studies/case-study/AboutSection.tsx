import React from 'react';
import { Box, Grid, SxProps, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MediaCard from '@regen-network/web-components/lib/components/cards/MediaCard';
import Section from '@regen-network/web-components/lib/components/section';
import {
  Body,
  Label,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { BlockContent } from '@regen-network/web-components/lib/components/block-content';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import { FluidObject } from 'gatsby-image';

import {
  CaseStudyAboutSectionQuery,
  SanityCaseStudyAboutSection,
} from '../../../generated/graphql';

interface StyleProps {
  lineRotate?: string;
  lineWidth?: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(21.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(25),
    },
  },
  background: {
    '&::before': {
      borderRadius: '10px',
      backgroundPosition: 'right center !important',
    },
  },
  image: {
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(17.5),
    },
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(28.5),
    },
  },
  cardContainer: {
    borderRadius: '10px',
    border: `1px solid ${theme.palette.grey[100]}`,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3.5, 24.25, 3.5, 3.5),
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5, 36, 5, 5),
    },
  },
  line: props => ({
    position: 'absolute',
    borderTop: `1px solid ${theme.palette.info.main}`,
    width: props.lineWidth || '50%',
    top: '50%',
    left: '30%',
    transform: props.lineRotate || 'rotate(-30deg)',
    zIndex: 0,
  }),
  card: {
    position: 'relative',
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      maxWidth: theme.spacing(54.75),
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.spacing(75),
    },
  },
  gridItem: {
    [theme.breakpoints.down('lg')]: {
      paddingTop: `${theme.spacing(5)} !important`,
    },
  },
}));

const query = graphql`
  query CaseStudyAboutSection {
    sanityCaseStudiesPage {
      aboutSection {
        header
        practice
        biome
        region
      }
    }
  }
`;

const AboutSection: React.FC<SanityCaseStudyAboutSection> = ({
  _rawAbout,
  aboutImage,
  mapImage,
  practice,
  biome,
  region,
  lineWidth,
  lineRotate,
}) => {
  const styles = useStyles({
    lineRotate: lineRotate || 'rotate(-25deg)',
    lineWidth: lineWidth || '53%',
  });
  const theme = useTheme();
  const data = useStaticQuery<CaseStudyAboutSectionQuery>(query);
  const content = data?.sanityCaseStudiesPage?.aboutSection;

  const sxs = {
    title: { pb: { xs: 8.75, md: 6 } } as SxProps,
  };

  return (
    <Section className={styles.root}>
      <Box display={{ xs: 'block', md: 'none' }}>
        <Title variant="h2" align="center" sx={sxs.title}>
          {content?.header}
        </Title>
      </Box>
      <Grid container spacing={10}>
        <Grid item xs={12} md={6}>
          <BackgroundImage
            className={styles.background}
            fluid={mapImage?.image?.asset?.fluid as FluidObject}
          >
            <div className={styles.cardContainer}>
              <MediaCard
                borderColor={theme.palette.grey[100]}
                imageClassName={styles.image}
                className={styles.card}
                imgSrc={aboutImage?.image?.asset?.url || ''}
                backgroundGradient={false}
              >
                <Box sx={{ p: 5, pt: 2 }}>
                  <CardItem label={content?.practice}>{practice}</CardItem>
                  <CardItem label={content?.biome}>{biome}</CardItem>
                  <CardItem label={content?.region}>{region}</CardItem>
                </Box>
              </MediaCard>
              <hr className={styles.line} />
            </div>
          </BackgroundImage>
        </Grid>
        <Grid item xs={12} md={6} className={styles.gridItem}>
          <Box display={{ xs: 'none', md: 'block' }}>
            <Title variant="h2" sx={sxs.title}>
              {content?.header}
            </Title>
          </Box>
          <Body as="div" size="xl" sx={{ color: 'info.dark' }}>
            <BlockContent content={_rawAbout} />
          </Body>
        </Grid>
      </Grid>
    </Section>
  );
};

const CardItem: React.FC<{ label?: string | null }> = ({ label, children }) => (
  <Box pt={2.5}>
    <Label size="sm" pt={1.25}>
      {label}
    </Label>
    <Body size="sm" pt={1.25}>
      {children}
    </Body>
  </Box>
);

export default AboutSection;
