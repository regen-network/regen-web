import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import BackgroundImage from 'gatsby-background-image';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    'background-position': 'bottom center',
    'background-repeat': 'repeat-y',
    'background-size': 'cover',
  },
}));

/**
 * This is a template for creating background sections. It's not actually used as a component anywhere.
 * @param Object {className, Children}
 */
const BackgroundSection = ({ className, children }: Props) => {
  const classes = useStyles({});
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
          <BackgroundImage
            Tag="section"
            className={clsx(classes.root, className)}
            fluid={imageData}
            backgroundColor={`#040e18`}
          >
            {children}
          </BackgroundImage>
        );
      }}
    />
  );
};

export default BackgroundSection;
