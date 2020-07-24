import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import BackgroundImage from 'gatsby-background-image';

import Title from 'web-components/lib/components/title';
import Tooltip from 'web-components/lib/components/tooltip';

const useStyles = makeStyles((theme: Theme) => ({
  text: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(38),
      paddingBottom: theme.spacing(10.5),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      '& h1': {
        lineHeight: '130%',
      },
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(80),
      paddingBottom: theme.spacing(27.5),
      paddingLeft: theme.spacing(37.5),
      paddingRight: theme.spacing(37.5),
      '& h1': {
        lineHeight: '140%',
      },
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: '25%',
      paddingLeft: theme.spacing(5),
    },
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
    position: 'relative',
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      lineHeight: '130%',
    },
    [theme.breakpoints.up('sm')]: {
      lineHeight: '140%',
    },
  },
  image: {
    backgroundSize: 'cover',
    [theme.breakpoints.down('xs')]: {
      backgroundPositionX: '-700px',
    },
  },
  backgroundGradient: {
    height: '100%',
    zIndex: 0,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    background:
      'linear-gradient(180deg, rgba(255, 249, 238, 0.74) 0%, rgba(255, 249, 238, 0) 27.6%), linear-gradient(194.2deg, #FAEBD1 12.63%, #7DC9BF 44.03%, #515D89 75.43%)',
    opacity: 0.8,
  },
  subtitle: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(3),
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(3.75),
      fontSize: theme.spacing(5.5),
    },
    lineHeight: '160%',
    color: theme.palette.primary.main,
  },
  tooltip: {
    color: '#b0ddc0',
    borderBottom: '3px dashed #b0ddc0',
  },
}));

const TopSection = () => {
  const classes = useStyles({});
  return (
    <StaticQuery
      query={graphql`
        query {
          desktop: file(relativePath: { eq: "buyers-top.jpg" }) {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          text: buyersYaml {
            topSection {
              header
              body {
                start
                underlined
                end
              }
            }
          }
        }
      `}
      render={data => {
        const imageData = data.desktop.childImageSharp.fluid;
        const content = data.text.topSection;
        return (
          <div>
            <BackgroundImage
              Tag="section"
              className={classes.image}
              fluid={imageData}
              backgroundColor="#040e18"
            >
              <div className={classes.backgroundGradient} />
              <div className={classes.text}>
                <Title color="primary" variant="h1" className={classes.title}>
                  {content.header}
                </Title>
                <Typography component="div" className={classes.subtitle}>
                  {content.body.start}{' '}
                  <Tooltip
                    arrow
                    placement="top"
                    title="Ecosystem services are the benefits people receive from healthy ecosystems, including clean air and water, resilient food systems, and mitigation of extreme climate events."
                  >
                    <span className={classes.tooltip}>{content.body.underlined}</span>
                  </Tooltip>{' '}
                  {content.body.end}
                </Typography>
              </div>
            </BackgroundImage>
          </div>
        );
      }}
    />
  );
};

export default TopSection;
