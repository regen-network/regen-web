import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core';

import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';
import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import { getFontSize } from 'web-components/lib/theme/sizing';
import BackgroundSection from '../../components/BackgroundSection';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(64.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(37.5),
      '&::before': {
        backgroundPosition: `right ${theme.spacing(27.5)} !important`,
      },
    },
  },
  title: {
    lineHeight: '145%',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(13.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(5.5),
    },
  },
  caption: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
      paddingBottom: theme.spacing(0.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(1),
    },
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: theme.palette.info.main,
  },
  slider: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(-4),
    },
  },
  green: {
    color: theme.palette.secondary.main,
  },
  phaseTitle: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(5.25),
      paddingBottom: theme.spacing(2),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(3),
    },
  },
}));

const OpenScienceSection = (): JSX.Element => {
  const classes = useStyles();

  return (
    <StaticQuery
      query={graphql`
        query {
          background: file(relativePath: { eq: "open-science.jpg" }) {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          content: scienceYaml {
            openScienceSection {
              header {
                start
                green
              }
              caption
              phases {
                title
                description
              }
            }
          }
        }
      `}
      render={data => {
        const content = data.content.openScienceSection;
        return (
          <BackgroundSection
            withSlider
            className={classes.root}
            linearGradient="unset"
            topSection={false}
            imageData={data.background.childImageSharp.fluid}
          >
            <Title className={classes.caption} variant="h6">
              {content.caption}
            </Title>
            <Title className={classes.title} variant="h1">
              {content.header.start} <span className={classes.green}>{content.header.green}</span>
            </Title>
            <ResponsiveSlider
              infinite={false}
              className={classes.slider}
              items={content.phases.map((phase, index) => (
                <div>
                  <Title variant="h3" className={classes.phaseTitle}>
                    {phase.title}
                  </Title>
                  <Description fontSize={getFontSize('big')}>{phase.description}</Description>
                </div>
              ))}
            />
          </BackgroundSection>
        );
      }}
    />
  );
};

export default OpenScienceSection;
