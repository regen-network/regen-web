import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import BackgroundImage from 'gatsby-background-image';

interface Props {
  className?: string;
}

let useStyles = makeStyles((theme: Theme) => ({
  root: {
    'text-align': 'center',
    'padding-left': '20vw',
    'padding-right': '20vw',
    color: theme.palette.primary.main,
    'padding-top': '20vh',
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
    'text-align': 'center',
    width: '25vw',
    margin: '0 auto',
  },
  '& p': {
    'line-height': '160%',
    'font-family': 'Lato',
  },
}));

const HomeFoldSection = ({ className }: Props) => {
  let classes = useStyles({});
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
              <h1>Platform for a Thriving Planet</h1>
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
