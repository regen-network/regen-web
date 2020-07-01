import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { graphql, StaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import MailSubmit from '../../components/mailSubmit';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: theme.spacing(130),
    color: theme.palette.primary.main,
    'font-family': theme.typography.h1.fontFamily,
    'text-align': 'center',
    'padding-top': theme.spacing(45),
    '& h2': {
      'margin-bottom': '1rem',
    },
    '& p': {
      'margin-bottom': '0px',
    },
  },
}));

const EmailSubmitSection = () => {
  const classes = useStyles({});
  return (
    <StaticQuery
      query={graphql`
        query {
          desktop: file(relativePath: { eq: "regen-handshake.png" }) {
            childImageSharp {
              fluid(quality: 90, maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      `}
      render={data => {
        const imageData = data.desktop.childImageSharp.fluid;
        return (
          <BackgroundImage
            className={classes.root}
            Tag="section"
            fluid={imageData}
            backgroundColor={`#040e18`}
          >
            <h2>Join the movement to incentivize regeneration.</h2>
            <p>sign up for our newsletter</p>
            <MailSubmit></MailSubmit>
          </BackgroundImage>
        );
      }}
    />
  );
};

export default EmailSubmitSection;
