import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Img from 'gatsby-image';
import ReactHtmlParser from 'react-html-parser';

import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';
import { getFontSize } from 'web-components/lib/theme/sizing';
import BackgroundSection from '../../components/BackgroundSection';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(23.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(17),
    },
  },
  title: {
    lineHeight: '140%',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(9),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(7.5),
    },
  },
  itemLeft: {
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(2.5),
    },
  },
  itemRight: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(2.5),
    },
  },
  description: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(2.25),
    },
  },
  image: {
    borderRadius: '10px',
  },
  grid: {
    [theme.breakpoints.down('xs')]: {
      '& > div:not(:first-child)': {
        paddingTop: theme.spacing(8.75),
      },
    },
  },
}));

const PartnershipsSection = (): JSX.Element => {
  const classes = useStyles();

  return (
    <StaticQuery
      query={graphql`
        query {
          background: file(relativePath: { eq: "science-partnerships-bg.jpg" }) {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          content: scienceYaml {
            partnershipsSection {
              header
              partners {
                image {
                  childImageSharp {
                    fluid(quality: 90) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
                description
              }
            }
          }
        }
      `}
      render={data => {
        const content = data.content.partnershipsSection;
        return (
          <BackgroundSection
            className={classes.root}
            linearGradient="unset"
            topSection={false}
            imageData={data.background.childImageSharp.fluid}
          >
            <Title align="center" className={classes.title} variant="h1">
              {content.header}
            </Title>
            <Grid container className={classes.grid}>
              {content.partners.map((p, i) => (
                <Grid
                  item
                  key={i}
                  xs={12}
                  sm={6}
                  className={i % 2 === 0 ? classes.itemLeft : classes.itemRight}
                >
                  <Img className={classes.image} fluid={p.image.childImageSharp.fluid} />
                  <Description className={classes.description}>{ReactHtmlParser(p.description)}</Description>
                </Grid>
              ))}
            </Grid>
          </BackgroundSection>
        );
      }}
    />
  );
};

export default PartnershipsSection;
