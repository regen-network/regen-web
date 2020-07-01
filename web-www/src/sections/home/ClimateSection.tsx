import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useStaticQuery, graphql } from 'gatsby';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Img from 'gatsby-image';
import ReactHtmlParser from 'react-html-parser'; 

import Section from '../../components/Section';
import Title from 'web-components/lib/components/title';
import Card from 'web-components/lib/components/cards/Card';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
  },
  card: {
    padding: `${theme.spacing(3.75)} ${theme.spacing(5)}`,
  },
  title: {
    lineHeight: '145%',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(6),
    },
  },
  cardTitle: {
    fontWeight: 800,
    color: theme.palette.info.dark,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    lineHeight: theme.spacing(3.75),
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
      lineHeight: theme.spacing(4.5),
    },
  },
  description: {
    lineHeight: '140%',
    color: theme.palette.info.dark,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(5.25),
    },
  },
}));


const ClimateSection = () => {
  const data = useStaticQuery(graphql`
    query {
      text: contentYaml {
        climateSection {
          header
          description
          solution {
            header
            description
          }
          problem {
            header
            description
          }
          image {
            childImageSharp {
              fixed(quality: 90) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
        }
      }
    }
  `);
  const classes = useStyles();
  const theme = useTheme();

  const content = data.text.climateSection;
  return (
    <Section className={classes.root}>
      <Title variant="h1" className={classes.title}>
        {content.header}
      </Title>
      <Title variant="h3" className={classes.description}>
        {ReactHtmlParser(content.description)}
      </Title>
      <Img fixed={content.image.childImageSharp.fixed} />
      <Card className={classes.card} borderColor={theme.palette.grey['100']} borderRadius="10px">
        <Title className={classes.cardTitle} variant="body2">{content.solution.header}</Title>
        <p>{content.solution.description}</p>
      </Card>
      <Card className={classes.card} borderColor={theme.palette.grey['100']} borderRadius="10px">
        <Title className={classes.cardTitle} variant="body2">{content.problem.header}</Title>
        <p>{content.problem.description}</p>
      </Card>
    </Section>
  );
};

export default ClimateSection;