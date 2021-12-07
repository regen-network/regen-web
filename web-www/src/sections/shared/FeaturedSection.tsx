import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useStaticQuery, graphql } from 'gatsby';
import ReactHtmlParser from 'react-html-parser';
import Img from 'gatsby-image';

import { Theme } from 'web-components/lib/theme/muiTheme';
import GreenCard from 'web-components/lib/components/cards/GreenCard';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import Title from 'web-components/lib/components/title';
import Section from 'web-components/lib/components/section';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      paddingBottom: theme.spacing(22.5),
    },
  },
  title: {
    lineHeight: '140%',
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(5),
    },
    '& p': {
      margin: 0,
    },
  },
  description: {
    color: theme.palette.info.dark,
    lineHeight: '150%',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
      paddingBottom: theme.spacing(4.5),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
      paddingBottom: theme.spacing(7),
    },
    '& a': {
      color: theme.palette.secondary.main,
      fontWeight: 'bold',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  },
  button: {
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: '60%',
    },
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(7),
      paddingLeft: theme.spacing(7),
    },
  },
  card: {
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(8),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(10),
    },
  },
  text: {
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(10),
    },
  },
  grid: {
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      flexDirection: 'column-reverse',
    },
  },
}));

const ApproachSection = () => {
  const data = useStaticQuery(graphql`{
  text: sharedYaml {
    featuredSection {
      header
      title
      link
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

  const content = data.text.featuredSection;

  return (
    <Section className={classes.root} title={content.header} titleVariant="subtitle2">
      <div className={classes.card}>
        <GreenCard>
          <Grid className={classes.grid} container wrap="nowrap">
            <Grid item xs={12} className={classes.text}>
              <Title className={classes.title} variant="h3">
                {ReactHtmlParser(content.title)}
              </Title>
              <Typography component="div" className={classes.description}>
                {ReactHtmlParser(content.description)}
              </Typography>
              <ContainedButton href={content.link} className={classes.button}>
                more details
              </ContainedButton>
            </Grid>
            <Grid item xs={12}>
              <Img fluid={content.image.childImageSharp.fluid} />
            </Grid>
          </Grid>
        </GreenCard>
      </div>
    </Section>
  );
};

export default ApproachSection;
