import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useStaticQuery, graphql } from 'gatsby';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ReactHtmlParser from 'react-html-parser'; 
import Img from 'gatsby-image';

import FeaturedCard from 'web-components/lib/components/cards/FeaturedCard';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import Title from 'web-components/lib/components/title';
import Section from '../../components/Section';

const useStyles = makeStyles((theme: Theme) => ({
  section: {},
  title: {
    lineHeight: '140%',
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(5),
    },
  },
  description: {
    color: theme.palette.info.dark,
    lineHeight: '150%',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
      paddingTop: theme.spacing(2.5),
      paddingBottom: theme.spacing(4.5),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(7),
    },
  },
  card: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(8),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(5),
    },
  },
  text: {
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(10),
    },
  },
}));

const ApproachSection = () => {
  const data = useStaticQuery(graphql`
    query {
      text: contentYaml {
        featuredSection {
          header
          title
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
  `);
  const classes = useStyles();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('sm'));
  
  const content = data.text.featuredSection;

  return (
    <Section className={classes.section} title={content.header} titleVariant="subtitle1">
      <div className={classes.card}>
        <FeaturedCard>
          <Grid container wrap="nowrap" direction={desktop? 'row' : 'column-reverse'}>
            <Grid item xs={12} sm={6} className={classes.text}>
              <Title className={classes.title} variant="h3">
                {ReactHtmlParser(content.title)}
              </Title>
              <Typography className={classes.description}>{ReactHtmlParser(content.description)}</Typography>
              <ContainedButton href={content.link}>buy</ContainedButton>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Img fluid={content.image.childImageSharp.fluid} />
            </Grid>
          </Grid>
        </FeaturedCard>
      </div>
    </Section>
  );
};

export default ApproachSection;
