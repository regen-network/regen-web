import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import { useStaticQuery, graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import ReactHtmlParser from 'react-html-parser';
import clsx from 'clsx';

import Section from 'web-components/src/components/section';
import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import DecentralizeIcon from 'web-components/src/components/icons/DecentralizeIcon';
import { TokenDescription as Description } from './Description';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(20),
      padding: theme.spacing(30, 0),
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(20, 0),
    },
    '& a': {
      textDecoration: 'none',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  },
  button: {
    textAlign: 'center',
    width: 360, //
  },
  title: {
    maxWidth: theme.spacing(172),
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(8),
      paddingBottom: theme.spacing(7.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(9.5),
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  description: {
    color: theme.palette.primary.main,
    fontSize: theme.spacing(5.75),
    textAlign: 'center',
    '& a': {
      color: theme.palette.secondary.light,
      '&:link': {
        textDecoration: 'underline',
      },
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(9.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(5),
      padding: `${theme.spacing(2.5)} ${theme.spacing(4)}`,
    },
  },
}));

const BlockExplorerSection = (): JSX.Element => {
  const styles = useStyles();
  const theme = useTheme();
  const data = useStaticQuery(graphql`
    query {
      background: file(relativePath: { eq: "stones-bg.png" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: tokenYaml {
        blockExplorerSection {
          header
          description
          buttonText
          buttonUrl
        }
      }
    }
  `);
  const content = data.text.blockExplorerSection;
  const imageData = data.background.childImageSharp.fluid;

  return (
    <BackgroundImage Tag="div" fluid={imageData}>
      <Section
        classes={{ root: styles.root, title: styles.title }}
        titleColor={theme.palette.primary.main}
        title={content.header}
      >
        <div className={styles.content}>
          <DecentralizeIcon />
          <Description className={styles.description}>{ReactHtmlParser(content.description)}</Description>
          <ContainedButton className={styles.button} href={content.buttonUrl}>
            {content.buttonText}
          </ContainedButton>
        </div>
      </Section>
    </BackgroundImage>
  );
};

export default BlockExplorerSection;
