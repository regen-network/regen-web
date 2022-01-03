import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Img from 'gatsby-image';
import ReactHtmlParser from 'react-html-parser';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';
import BackgroundSection from '../../components/BackgroundSection';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(27.5),
    },
  },
  title: {
    lineHeight: '140%',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(6),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(4),
    },
  },
  description: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(4),
    },
  },
  image: {
    borderRadius: '10px',
  },
}));

const OpenAgSection = (): JSX.Element => {
  const classes = useStyles();

  return (
    <StaticQuery
      query={graphql`
        {
          background: file(relativePath: { eq: "developers-topo-bg.jpg" }) {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          content: developersYaml {
            openAgSection {
              header
              image {
                childImageSharp {
                  fluid(quality: 90) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              body
            }
          }
        }
      `}
      render={data => {
        const content = data.content.openAgSection;
        return (
          <BackgroundSection
            linearGradient="unset"
            topSection={false}
            imageData={data.background.childImageSharp.fluid}
            className={classes.section}
          >
            <Grid container alignItems="center" spacing={8}>
              <Grid item xs={12} sm={6}>
                <Img fluid={content.image.childImageSharp.fluid} className={classes.image} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Title className={classes.title} variant="h3">
                  {content.header}
                </Title>
                <Description className={classes.description}>{ReactHtmlParser(content.body)}</Description>
              </Grid>
            </Grid>
          </BackgroundSection>
        );
      }}
    />
  );
};

export default OpenAgSection;
