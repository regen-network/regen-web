import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useStaticQuery, graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';

import Title from 'web-components/lib/components/title';
import Section from '../../components/Section';

// Component not used anymore
const useStyles = makeStyles((theme: Theme) => ({
  image: {
    backgroundSize: 'cover',
    [theme.breakpoints.down('xs')]: {
      backgroundPositionX: '-700px',
    },
  },
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(18.75),
      paddingBottom: theme.spacing(44),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(17.5),
      paddingBottom: theme.spacing(67),
    },
  },
  grid: {
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(16.75),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(13),
    },
  },
  uppercase: {
    fontWeight: 800,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    [theme.breakpoints.up('sm')]: {
      lineHeight: theme.spacing(5.75),
    },
    [theme.breakpoints.down('xs')]: {
      lineHeight: theme.spacing(4.5),
    },
  },
  caption: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(3.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(2.5),
    },
  },
  description: {
    color: theme.palette.info.dark,
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(3.5),
      paddingBottom: theme.spacing(9),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
      paddingTop: theme.spacing(2.5),
      paddingBottom: theme.spacing(9),
    },
  },
  green: {
    color: theme.palette.secondary.main,
  },
  red: {
    color: theme.palette.error.light,
  },
  header: {
    lineHeight: '140%',
  },
  note: {
    fontSize: theme.spacing(3.5),
    lineHeight: '150%',
    textAlign: 'center',
    color: theme.palette.info.dark,
    textDecorationLine: 'underline',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(3),
    },
  },
}));

const ApproachSection = () => {
  const data = useStaticQuery(graphql`
    query {
      background: file(relativePath: { eq: "investing-land-stewards.jpg" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: buyersYaml {
        investingSection {
          header
          note
          noteLink
          items {
            image {
              extension
              publicURL
            }
            caption
            header
            description
          }
        }
      }
    }
  `);
  const classes = useStyles();
  const theme = useTheme();
  
  const content = data.text.investingSection;
  const imageData = data.background.childImageSharp.fluid;
  const note: JSX.Element = (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={content.noteLink}
    >
      <Typography className={classes.note}>{content.note}</Typography>
    </a>
  );

  return (
    <BackgroundImage
      Tag="section"
      className={classes.image}
      fluid={imageData}
      backgroundColor={theme.palette.grey['50']}
    >
      <Section className={classes.section} title={content.header} titleVariant="subtitle1">
        <Grid container justify="space-evenly" className={classes.grid}>
          {content.items.map((item: any, index: number) => (
            <Grid item key={index} xs={12} sm={6}>
              <img src={item.image.publicURL} alt={item.image.publicURL} />
              <Title
                align="center"
                variant="h6"
                className={clsx(classes.caption, classes.uppercase, index > 0 ? classes.green : classes.red)}
              >
                {item.caption}
              </Title>
              <Title align="center" variant="h3" className={classes.header}>
                {item.header}
              </Title>
              <Title align="center" variant="h6" className={clsx(classes.description, classes.uppercase)}>
                {item.description}
              </Title>
              <Box display={{ xs: 'none', sm: 'block' }}>{index === 0 && note}</Box>
            </Grid>
          ))}
        </Grid>
        <Box display={{ xs: 'block', sm: 'none' }}>{note}</Box>
      </Section>
    </BackgroundImage>
  );
};

export default ApproachSection;
