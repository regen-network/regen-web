import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { graphql, StaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import MailSubmit from '../../components/mailSubmit';
import Title from 'web-components/lib/components/title';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(50)} ${theme.spacing(46.25)}`,
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      padding: `${theme.spacing(50)} ${theme.spacing(30)}`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(21.25)} ${theme.spacing(4)}`,
    },
  },
  title: {
    color: theme.palette.primary.main,
    textAlign: 'center',
  },
  description: {
    color: theme.palette.primary.main,
    textAlign: 'center',
    fontWeight: 800,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(7.5),
      paddingBottom: theme.spacing(6.25),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(4),
    },
  },
}));

const EmailSubmitSection = () => {
  const classes = useStyles({});
  return (
    <StaticQuery
      query={graphql`
        query {
          text: sharedYaml {
            newsletterSection {
              header
              description
            }
          }
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
        const content = data.text.newsletterSection;
        return (
          <BackgroundImage Tag="section" fluid={imageData} backgroundColor={`#040e18`}>
            <div className={classes.root}>
              <Title className={classes.title} variant="h2">
                {content.header}
              </Title>
              <Title variant="h6" className={classes.description}>
                {content.description}
              </Title>
              <MailSubmit />
            </div>
          </BackgroundImage>
        );
      }}
    />
  );
};

export default EmailSubmitSection;
