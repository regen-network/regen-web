import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import BackgroundImage from 'gatsby-background-image';
import VideoPopup from '../components/videoPopup';
import Title from 'web-components/lib/components/title';
import { useTheme } from '@material-ui/core/styles';

interface Props {
  className?: string;
}

let useStyles = makeStyles((theme: Theme) => ({
  root: {
    'text-shadow': '0px 4px 10px rgba(0, 0, 0, 0.1)',
    'text-align': 'center',
    'padding-left': '20vw',
    'padding-right': '20vw',
    color: theme.palette.primary.main,
    'padding-top': '13vh',
    'padding-bottom': '40vh',
    width: '100%',
    height: '60vh',
    'background-position': 'bottom center',
    'background-repeat': 'repeat-y',
    'background-size': 'cover',
  },
  gradient: {
    background:
      'linear-gradient(217.94deg, rgba(250, 235, 209, 0.5) 22.17%, rgba(125, 201, 191, 0.5) 46.11%, rgba(81, 93, 137, 0.5) 70.05%)',
    opacity: 0.8,
  },
  tag: {
    'text-shadow': '0px 4px 10px rgba(0, 0, 0, 0.1)',
    'text-align': 'center',
    width: '25vw',
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
  '& p': {
    'line-height': '160%',
    'font-family': 'Lato',
  },
  '& h1.MuiTypography-h1': {
    color: theme.palette.primary.main,
  },
  title: {
    'font-family': 'Muli',
    'line-height': '130%',
  },
}));

const HomeFoldSection = ({ className }: Props) => {
  const classes = useStyles({});
  const theme = useTheme();
  return (
    <StaticQuery
      query={graphql`
        query {
          desktop: file(relativePath: { eq: "image43.jpg" }) {
            childImageSharp {
              fluid(quality: 90, maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      `}
      render={data => {
        // Set ImageData.
        const imageData = data.desktop.childImageSharp.fluid;
        return (
          <div className={classes.gradient}>
            <BackgroundImage
              Tag="section"
              className={clsx(classes.root, className)}
              fluid={imageData}
              backgroundColor={`#040e18`}
            >
              <VideoPopup></VideoPopup>
              <Title align="center" color="primary" variant="h1" className={classes.title}>
                Platform for a Thriving Planet
              </Title>
              <div className={classes.tag}>
                <p>Regen Network aligns economics with ecology to drive regenerative land management.</p>
              </div>
            </BackgroundImage>
          </div>
        );
      }}
    />
  );
};

export default HomeFoldSection;
