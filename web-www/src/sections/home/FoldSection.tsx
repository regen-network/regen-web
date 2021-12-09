import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import BackgroundImage from 'gatsby-background-image';
import Typography from '@material-ui/core/Typography';
import Title from 'web-components/lib/components/title';

interface Props {
  className?: string;
}

let useStyles = makeStyles((theme: Theme) => ({
  root: {
    'text-shadow': '0px 4px 10px rgba(0, 0, 0, 0.1)',
    'text-align': 'center',
    color: theme.palette.primary.main,
    width: '100%',
    height: '90vh',
    'background-position': 'bottom center',
    'background-repeat': 'repeat-y',
    'background-size': 'cover',
    [theme.breakpoints.up('sm')]: {
      'padding-top': '29vh',
      'padding-bottom': '40vh',
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: '12vh',
    },
    [theme.breakpoints.down('xs')]: {
      'padding-top': '15vh',
      height: '80vh',
    },
  },
  tag: {
    '& p': {
      'line-height': '160%',
      'font-family': 'Lato',
      [theme.breakpoints.up('sm')]: {
        'font-size': '1.62rem',
        width: '650px',
      },
      [theme.breakpoints.down('xs')]: {
        width: '90%',
        'font-size': '1.125em',
      },
      margin: '0 auto',
    },
    'text-shadow': '0px 4px 10px rgba(0, 0, 0, 0.3)',
    'text-align': 'center',
    margin: '0 auto',
  },
  icon: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    top: '50%',
    left: '54%',
    transform: 'translate(-50%, -50%)',
  },
  '& h1.MuiTypography-h1': {
    color: theme.palette.primary.main,
  },
  title: {
    'font-family': 'Muli',
    'line-height': '130%',
    'margin-bottom': '12px',
    [theme.breakpoints.down('xs')]: {
      margin: '0 auto',
      'margin-top': '25px',
      'margin-bottom': '12px',
      width: '80%',
    },
    [theme.breakpoints.up('sm')]: {
      'margin-top': '37px',
    },
  },
  backgroundGradient: {
    height: '100%',
    zIndex: -1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    background:
      'linear-gradient(217.94deg, rgba(250, 235, 209, 0.5) 22.17%, rgba(125, 201, 191, 0.5) 46.11%, rgba(81, 93, 137, 0.5) 70.05%);',
    opacity: 0.8,
  },
}));

const HomeFoldSection = ({ className }: Props): JSX.Element => {
  const classes = useStyles({});
  const data = useStaticQuery(graphql`
    query {
      desktop: file(relativePath: { eq: "image43.jpg" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: homeYaml {
        foldSection {
          tagline
          description
        }
      }
    }
  `);
  const imageData = data.desktop.childImageSharp.fluid;
  const content = data.text.foldSection;
  return (
    <BackgroundImage
      Tag="section"
      className={clsx(classes.root, className)}
      fluid={imageData}
      backgroundColor={`#040e18`}
    >
      <div className={classes.backgroundGradient}></div>
      <Title align="center" color="primary" variant="h1" className={classes.title}>
        {content.tagline}
      </Title>
      <div className={classes.tag}>
        <Typography variant="body1">{content.description}</Typography>
      </div>
    </BackgroundImage>
  );
};

export default HomeFoldSection;
