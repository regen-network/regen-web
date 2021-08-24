import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import BackgroundImage from 'gatsby-background-image';
import { FluidObject } from 'gatsby-image';
import ReactHtmlParser from 'react-html-parser';

import Section from 'web-components/src/components/section';
import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import { MarketingDescription } from '../../components/Description';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(22.5), //todo
    paddingBottom: theme.spacing(22.5), //todo
  },
  content: {
    width: '80%',
    maxWidth: theme.spacing(236.5),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(32),
    },
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& p': {
      textAlign: 'center',
    },
  },
}));

type QueryData = {
  bg: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  text: {
    collectiveSection: {
      title: string;
      body: string;
      buttonText: string;
      buttonUrl: string;
    };
  };
};

const CollectiveSection = (): JSX.Element => {
  const styles = useStyles();

  const {
    bg: {
      childImageSharp: { fluid },
    },
    text: {
      collectiveSection: { title, body, buttonText, buttonUrl },
    },
  } = useStaticQuery<QueryData>(graphql`
    query {
      bg: file(relativePath: { eq: "topo-bg-portrait.jpg" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: communityYaml {
        collectiveSection {
          title
          body
          buttonText
          buttonUrl
        }
      }
    }
  `);
  const topo = fluid;

  return (
    <BackgroundImage fluid={topo} className={styles.root}>
      <Section title={title} classes={{ root: clsx(styles.root, styles.center), title: styles.title }}>
        <MarketingDescription className={clsx(styles.content, styles.center)}>
          {ReactHtmlParser(body)}
        </MarketingDescription>
        <ContainedButton href={buttonUrl}>{buttonText}</ContainedButton>
      </Section>
    </BackgroundImage>
  );
};

export default CollectiveSection;
