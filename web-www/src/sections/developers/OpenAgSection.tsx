import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import { GatsbyImage } from 'gatsby-plugin-image';
import ReactHtmlParser from 'react-html-parser';

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
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(4),
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
  image: {
    borderRadius: '10px',
  },
}));

const OpenAgSection = (): JSX.Element => {
  const classes = useStyles();

  return (
    <StaticQuery
      query={graphql`{
  background: file(relativePath: {eq: "developers-topo-bg.jpg"}) {
    childImageSharp {
      gatsbyImageData(quality: 90, layout: FULL_WIDTH)
    }
  }
  content: developersYaml {
    openAgSection {
      header
      image {
        childImageSharp {
          gatsbyImageData(quality: 90, layout: FULL_WIDTH)
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
            imageData={data.background.childImageSharp.gatsbyImageData}
            className={classes.section}
          >
            <Grid container alignItems="center" spacing={8}>
              <Grid item xs={12} sm={6}>
                <GatsbyImage
                  image={content.image.childImageSharp.gatsbyImageData}
                  className={classes.image} />
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
