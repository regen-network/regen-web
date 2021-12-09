import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import BackgroundImage from 'gatsby-background-image';
import Typography from '@material-ui/core/Typography';
import Title from 'web-components/lib/components/title';

interface Props {
  className?: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    textShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    color: theme.palette.primary.main,
    width: '100%',
    height: '90vh',
    backgroundPosition: 'bottom center',
    backgroundRepeat: 'repeat-y',
    backgroundSize: 'cover',
    [theme.breakpoints.up('sm')]: {
      paddingTop: '29vh',
      paddingBottom: '40vh',
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: '12vh',
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: '15vh',
      height: '80vh',
    },
  },
  tag: {
    '& p': {
      lineHeight: '160%',
      fontFamily: 'Lato',
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.62rem',
        width: '650px',
      },
      [theme.breakpoints.down('xs')]: {
        width: '90%',
        fontSize: '1.125em',
      },
      margin: '0 auto',
    },
    textShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
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
    fontFamily: 'Muli',
    lineHeight: '130%',
    marginBottom: '12px',
    [theme.breakpoints.down('xs')]: {
      margin: '0 auto',
      marginTop: theme.spacing(13.5),
      marginBottom: theme.spacing(3),
      width: '80%',
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(21.5),
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
  const styles = useStyles({});
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
      className={clsx(styles.root, className)}
      fluid={imageData}
      backgroundColor={`#040e18`}
    >
      <div className={styles.backgroundGradient}></div>
      <Title align="center" color="primary" variant="h1" className={styles.title}>
        {content.tagline}
      </Title>
      <div className={styles.tag}>
        <Typography variant="body1">{content.description}</Typography>
      </div>
    </BackgroundImage>
  );
};

export default HomeFoldSection;
