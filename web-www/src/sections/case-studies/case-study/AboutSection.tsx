import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { graphql, StaticQuery } from 'gatsby';
import ReactHtmlParser from 'react-html-parser';
import { FluidObject } from 'gatsby-image';
import BackgroundImage from 'gatsby-background-image';

import { Theme } from 'web-components/lib/theme/muiTheme';
import MediaCard from 'web-components/lib/components/cards/MediaCard';
import Title from 'web-components/lib/components/title';
import Section from 'web-components/lib/components/section';
import Description from 'web-components/lib/components/description';

interface AboutSectionProps {
  about: string;
  aboutImage: {
    publicURL: string;
  };
  mapImage: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  practice: string;
  biome: string;
  region: string;
  lineRotate?: string;
  lineWidth?: string;
}

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
  cardTitle: {
    fontFamily: theme.typography.h1.fontFamily,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: 800,
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3),
      lineHeight: theme.spacing(3.75),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
      lineHeight: theme.spacing(4.5),
    },
  },
  title: {
    [theme.breakpoints.down('md')]: {
      paddingBottom: theme.spacing(8.75),
    },
  },
  cardDescription: {
    marginBottom: 0,
    paddingTop: theme.spacing(1.25),
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
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

const AboutSection = ({
  about,
  aboutImage,
  mapImage,
  practice,
  biome,
  region,
  lineRotate,
  lineWidth,
}: AboutSectionProps): JSX.Element => {
  const classes = useStyles({ lineRotate, lineWidth });
  const theme = useTheme();
  return (
    <StaticQuery
      query={graphql`
        query {
          text: caseStudiesYaml {
            caseStudies {
              aboutSection {
                header
                practice
                biome
                region
              }
            }
          }
        }
      `}
      render={data => {
        const content = data.text.caseStudies.aboutSection;
        return (
          <Section className={classes.root}>
            <Box display={{ xs: 'block', md: 'none' }}>
              <Title align="center" variant="h2" className={classes.title}>
                {content.header}
              </Title>
            </Box>
            <Grid container spacing={10}>
              <Grid item xs={12} md={6}>
                <BackgroundImage className={classes.background} fluid={mapImage.childImageSharp.fluid}>
                  <div className={classes.cardContainer}>
                    <MediaCard
                      borderColor={theme.palette.grey[100]}
                      imageClassName={classes.image}
                      className={classes.card}
                      imgSrc={aboutImage.publicURL}
                      backgroundGradient={false}
                    >
                      <div className={classes.cardContent}>
                        <div className={classes.cardItem}>
                          <div className={classes.cardTitle}>{content.practice}</div>
                          <Description className={classes.cardDescription}>{practice}</Description>
                        </div>
                        <div className={classes.cardItem}>
                          <div className={classes.cardTitle}>{content.biome}</div>
                          <Description className={classes.cardDescription}>{biome}</Description>
                        </div>
                        <div className={classes.cardItem}>
                          <div className={classes.cardTitle}>{content.region}</div>
                          <Description className={classes.cardDescription}>{region}</Description>
                        </div>
                      </div>
                    </MediaCard>
                    <hr className={classes.line} />
                  </div>
                </BackgroundImage>
              </Grid>
              <Grid item xs={12} md={6} className={classes.gridItem}>
                <Box display={{ xs: 'none', md: 'block' }}>
                  <Title variant="h2" className={classes.title}>
                    {content.header}
                  </Title>
                </Box>
                <Description className={classes.about}>{ReactHtmlParser(about)}</Description>
              </Grid>
            </Grid>
          </Section>
        );
      }}
    />
  );
};

export default AboutSection;
