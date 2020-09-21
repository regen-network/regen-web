import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { graphql, StaticQuery } from 'gatsby';
import Grid from '@material-ui/core/Grid';
import Img from 'gatsby-image';
import ReactHtmlParser from 'react-html-parser';

import Section from 'web-components/lib/components/section';
import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[50],
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(22.5),
      paddingBottom: theme.spacing(32),
    },
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(37.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(10),
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(22.5),
      paddingBottom: theme.spacing(12.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingRight: 0,
      paddingLeft: 0,
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: theme.spacing(5),
    },
  },
  description: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
    },
  },
  text: {
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      paddingLeft: theme.spacing(10),
      flexGrow: 0,
      flexBasis: '50%',
      maxWidth: '50%',
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(14),
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
    [theme.breakpoints.between('md', 'xl')]: {
      maxWidth: theme.spacing(170),
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: theme.spacing(152),
    },
    marginRight: 'auto',
  },
  imageContainer: {
    position: 'relative',
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      flexGrow: 0,
      flexBasis: '50%',
      maxWidth: '50%',
    },
  },
  imageBackground: {
    position: 'absolute',
    width: '90%',
    zIndex: 0,
    [theme.breakpoints.up('sm')]: {
      bottom: theme.spacing(-6.25),
    },
    [theme.breakpoints.down('xs')]: {
      bottom: theme.spacing(-3),
    },
  },
  image: {
    zIndex: 1,
  },
}));

const EnableSection = (): JSX.Element => {
  const classes = useStyles();

  return (
    <StaticQuery
      query={graphql`
        query {
          background: file(relativePath: { eq: "image-topo-bg.jpg" }) {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          content: pressKitYaml {
            enableSection {
              header
              description
              image {
                childImageSharp {
                  fluid(quality: 90) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        const content = data.content.enableSection;
        return (
          <div className={classes.root}>
            <Grid container alignItems="center">
              <Grid xs={12} className={classes.imageContainer}>
                <Img className={classes.image} fluid={content.image.childImageSharp.fluid} />
                <div className={classes.imageBackground}>
                  <Img fluid={data.background.childImageSharp.fluid} />
                </div>
              </Grid>
              <Grid xs={12} className={classes.text}>
                <Title variant="h2">{content.header}</Title>
                <Description className={classes.description}>
                  {ReactHtmlParser(content.description)}
                </Description>
              </Grid>
            </Grid>
          </div>
        );
      }}
    />
  );
};

export default EnableSection;
