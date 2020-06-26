import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Img from "gatsby-image";
import { useStaticQuery, graphql } from 'gatsby';
import Grid from '@material-ui/core/Grid';

import Title from 'web-components/lib/components/title';
import ImageItem from 'web-components/lib/components/image-item';
import Section from '../../components/Section';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(22.25),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(17.75),
    },
  },
  title: {
    lineHeight: '140%',
    [theme.breakpoints.up('sm')]: {
      paddingRight: '8%',
      paddingLeft: '8%',
    },
  },
  container: {
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'nowrap',
      overflowX: 'auto',
      paddingTop: theme.spacing(11.75),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(8),
    },
  },
  item: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flex: '0 0 auto',
      marginRight: theme.spacing(4),
      maxWidth: '75%',
    },
  },
}));

const ApproachSection = () => {
  const data = useStaticQuery(graphql`
    query {
      text: contentYaml {
        approachSection {
          header
          imageItems {
            image {
              childImageSharp {
                fixed(quality: 90) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
              extension
              publicURL
            }
            header
            description
          }
        }
      }
    }
  `);
  const content = data.text.approachSection;
  const classes = useStyles({});

  return (
    <Section className={classes.root}>
      <Title className={classes.title} variant="subtitle1" align="center">
        {content.header}
      </Title>
      <Grid className={classes.container} container spacing={3}>
        {content.imageItems.map((item, index) => {
          return (
            <Grid sm={4} item key={index} className={classes.item}>
              <ImageItem
                img={
                  !item.image.childImageSharp && item.image.extension === 'svg' ? (
                    <img src={item.image.publicURL} alt={item.image.publicURL} />
                  ) : (
                    <Img fixed={item.image.childImageSharp.fixed} />
                  )
                }
                title={item.header}
                description={item.description}
              />
            </Grid>
          );
        })}
      </Grid>
    </Section>
  );
};

export default ApproachSection;
