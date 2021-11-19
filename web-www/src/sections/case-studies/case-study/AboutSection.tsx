import React from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { graphql, StaticQuery, useStaticQuery } from 'gatsby';
import ReactHtmlParser from 'react-html-parser';
import { FluidObject } from 'gatsby-image';
import BackgroundImage from 'gatsby-background-image';

import MediaCard from 'web-components/lib/components/cards/MediaCard';
import Title from 'web-components/lib/components/title';
import Section from 'web-components/lib/components/section';
import Description from 'web-components/lib/components/description';
import { BlockContent } from 'web-components/src/components/block-content';
import { CaseStudyAboutSectionQuery, SanityCaseStudyAboutSection } from '../../../generated/graphql';

interface StyleProps {
  lineRotate?: string;
  lineWidth?: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(21.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(25),
    },
  },
  cardTitle: {
    fontFamily: theme.typography.h1.fontFamily,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: 800,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
      lineHeight: theme.spacing(3.75),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
      lineHeight: theme.spacing(4.5),
    },
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(8.75),
    },
  },
  cardDescription: {
    marginBottom: 0,
    paddingTop: theme.spacing(1.25),
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
      lineHeight: theme.spacing(3.75),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
      lineHeight: theme.spacing(4.5),
    },
  },
  cardContent: {
    padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
  },
  cardItem: {
    paddingTop: theme.spacing(5),
  },
  about: {
    lineHeight: '150%',
    fontWeight: 500,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(5.5),
    },
  },
  background: {
    '&::before': {
      borderRadius: '10px',
      backgroundPosition: 'right center !important',
    },
  },
  image: {
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(17.5),
    },
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(28.5),
    },
  },
  cardContainer: {
    borderRadius: '10px',
    border: `1px solid ${theme.palette.grey[100]}`,
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(3.5)} ${theme.spacing(24.25)} ${theme.spacing(3.5)} ${theme.spacing(3.5)}`,
    },
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(5)} ${theme.spacing(36)} ${theme.spacing(5)} ${theme.spacing(5)}`,
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
    [theme.breakpoints.down('xs')]: {
      maxWidth: theme.spacing(54.75),
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.spacing(75),
    },
  },
  gridItem: {
    [theme.breakpoints.down('md')]: {
      padding: `0 ${theme.spacing(5)} !important`,
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
  const styles = useStyles({ lineRotate: lineRotate || 'rotate(-25deg)', lineWidth: lineWidth || '53%' });
  const theme = useTheme();
  const data = useStaticQuery<CaseStudyAboutSectionQuery>(query);
  const content = data?.sanityCaseStudiesPage?.aboutSection;

  return (
    <Section className={styles.root}>
      <Box display={{ xs: 'block', md: 'none' }}>
        <Title align="center" variant="h2" className={styles.title}>
          {content?.header}
        </Title>
      </Box>
      <Grid container spacing={10}>
        <Grid item xs={12} md={6}>
          <BackgroundImage className={styles.background} fluid={mapImage?.image?.asset?.fluid as FluidObject}>
            <div className={styles.cardContainer}>
              <MediaCard
                borderColor={theme.palette.grey[100]}
                imageClassName={styles.image}
                className={styles.card}
                imgSrc={aboutImage?.image?.asset?.url || ''}
                backgroundGradient={false}
              >
                <div className={styles.cardContent}>
                  <div className={styles.cardItem}>
                    <div className={styles.cardTitle}>{content?.practice}</div>
                    <Description className={styles.cardDescription}>{practice}</Description>
                  </div>
                  <div className={styles.cardItem}>
                    <div className={styles.cardTitle}>{content?.biome}</div>
                    <Description className={styles.cardDescription}>{biome}</Description>
                  </div>
                  <div className={styles.cardItem}>
                    <div className={styles.cardTitle}>{content?.region}</div>
                    <Description className={styles.cardDescription}>{region}</Description>
                  </div>
                </div>
              </MediaCard>
              <hr className={styles.line} />
            </div>
          </BackgroundImage>
        </Grid>
        <Grid item xs={12} md={6} className={styles.gridItem}>
          <Box display={{ xs: 'none', md: 'block' }}>
            <Title variant="h2" className={styles.title}>
              {content?.header}
            </Title>
          </Box>
          <Description className={styles.about}>{<BlockContent content={_rawAbout} />}</Description>
        </Grid>
      </Grid>
    </Section>
  );
};

export default AboutSection;
